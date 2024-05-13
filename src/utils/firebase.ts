// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    signInWithPopup,
    signInWithRedirect,
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver
} from "firebase/auth";

import { 
    getFirestore, 
    collection, 
    doc, 
    getDocs, 
    getDoc,
    query,
    where,
    setDoc,
    Timestamp,
    updateDoc,
    collectionGroup,
    addDoc,
    deleteDoc,
    orderBy,
    DocumentData,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { FieldValues } from "react-hook-form";
import { v4 } from 'uuid'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxGAYfm28IJUj01Djbz6WuBsCqJClkKH4",
    authDomain: "vanlife-db.firebaseapp.com",
    projectId: "vanlife-db",
    storageBucket: "vanlife-db.appspot.com",
    messagingSenderId: "464785505481",
    appId: "1:464785505481:web:69b2025b743c2151e62118"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
const storage = getStorage()

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

const githubProvider = new GithubAuthProvider();
githubProvider.setCustomParameters({
    'allow_signup': 'false'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGithubPopup = () => signInWithPopup(auth, githubProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export type AdditionalInformation = {
    displayName?: string;
}

export type Van = {
    id: string;
    name: string;
    price: number;
    type: string;
    hostId: string;
    description: string;
    imageUrl: string;
    createdAt: Timestamp;
    locationValue: string;
    bathroomCount: number;
    bedCount: number;
    capacityCount: number;
    displayName?: string;
    reservations: Reservation[]
}

export type Favorite = {
    id: string;
    name: string;
    price: number;
    type: string;
    hostId: string;
    description: string;
    imageUrl: string;
    createdAt: Timestamp;
    locationValue: string;
    bathroomCount: number;
    bedCount: number;
    capacityCount: number;
    reservations: Reservation[]
}

export type Reservation = {
    id: string;
    startDate: Timestamp;
    endDate: Timestamp;
    totalPrice: number;
    vanId: string;
    createdAt: Timestamp;
}

export type Trip = {
    id: string;
    startDate: Timestamp;
    endDate: Timestamp;
    totalPrice: number;
    vanId: string;
    createdAt: Timestamp;
    van: Van;
}

export const createUserDocumentFromAuth = async (userAuth: User, additionalInformation?: AdditionalInformation) => {
    if(!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            })
        } catch(error) {
            console.error('Error creating user: ',error);
        }
    }

    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async ( email: string, password: string ) => {
    if(!email || !password) return
    
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async ( email: string, password: string ) => {
    if(!email || !password) return
    
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
    if(!callback) return
    
    return onAuthStateChanged(auth, callback)
}

export const createReservationDocumentOfUser = async ( startDate: Date, endDate: Date, van: Van, totalPrice: number ) => {
    const userID = auth.currentUser?.uid;

    if(!userID) return

    const { name, price, imageUrl, id, type, hostId } = van

    const vansDocRef = doc(db, 'vans', id)
    const vansSnapshot = await getDoc(vansDocRef)
    const createdAt = new Date()

    if(vansSnapshot.exists()) {
        
        const reservations = await getVanReservationsDocuments(van.id)

        const startTimestamp = Timestamp.fromDate(startDate);
        const endTimestamp = Timestamp.fromDate(endDate);
        
        const existingReservationDate = reservations.find((reservation) => 
            (reservation.startDate <= startTimestamp && reservation.endDate >= startTimestamp 
            || reservation.startDate <= endTimestamp && reservation.endDate >= endTimestamp
            || startTimestamp <= reservation.startDate && endTimestamp >= reservation.endDate))
        
        if(existingReservationDate) {
            throw new Error('Some Dates are already Taken!')
        } else {
            try {
                const vanData = vansSnapshot.data()

                const newReservation = { startDate, endDate, totalPrice, createdAt, vanId: id, userID  }
                vanData.reservations.push(newReservation)

                const reservationDocRef = doc(db, 'reservations', userID)
                const collectionVal = collection(reservationDocRef, 'resLists')
        
                await setDoc(vansDocRef, vanData)
                await addDoc(collectionVal, {
                    startDate,
                    endDate,
                    totalPrice,
                    createdAt,
                    vanId: id,
                    van: {
                        id,
                        name,
                        price,
                        imageUrl,
                        type,
                        hostId,
                    }
                })
            } catch(err) {
                console.log('Error creating reservation.', err);
            }
        }
    }
}

export const cancelUserTripReservation = async(tripId: string) => {
    const userID = auth.currentUser?.uid

    if(!userID) return

    const tripsDocRef = doc(collection(doc(db, 'reservations', userID), 'resLists'), tripId)
    const tripsSnapshot = await getDoc(tripsDocRef)
    
    if(tripsSnapshot.exists()) {
        try {
            await deleteDoc(tripsDocRef)            
        } catch(err) {
            console.log('Error cancelling reservation, Please try again!', err);
            
        }
        
    }
}


export const getVanReservationsDocuments = async(id: string) => {
    const reservationsRef = collectionGroup(db, 'resLists')
    
    const q = query(reservationsRef, where('vanId', '==', id));

    try {
        const querySnapshot = await getDocs(q);

        const dataArr = querySnapshot.docs.map((doc) => ({
            ...doc.data()
        }))
        
        
        return dataArr
    } catch (error) {
        console.error('Error getting reservations:', error);
        return [];
    }
}

export const getUserReservationTripsDocuments = async () => {
    const userID = auth.currentUser?.uid;

    if(!userID) return []
    
    const reservationDocRef = collection(db, `reservations/${userID}/resLists`)
    const reservationSnapshot = await getDocs(reservationDocRef)

    const tripsArr = reservationSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }))
    
    return tripsArr as Reservation[]
}

//ADD PRODUCT TO FIREBASE
export const uploadImageToStorage = async (image: string) => {
    const imgs = ref(storage, `images/${v4()}`)
    
    try {

    const blob = new Blob([image], { type: 'image/jpeg' });
    const uploadImage = await uploadBytesResumable(imgs, blob)
    
    const imageUrl = await getDownloadURL(uploadImage.ref)

    return imageUrl
    } catch(err) {
        console.log('Error', err);
    }
}

export const createVanDocument = async (data: FieldValues) => {
    const userID = auth.currentUser?.uid;

    if(!userID) return []

    const vanDocRef = collection(db, 'vans')
    const { name, description, imageUrl, category, capacityCount, bedCount, bathroomCount, location, price } = data
    const createdAt = new Date()

    try{
        const image = await uploadImageToStorage(imageUrl)
        if(image){
            await addDoc(vanDocRef, {
                name,
                description,
                type: category,
                bedCount,
                bathroomCount,
                capacityCount,
                locationValue: location.value,
                price,
                hostId: userID,
                imageUrl: image,
                createdAt,
                reservations: [],
            })
        }
    } catch(err) {
        console.log('Failed Creating Van!', err);
        
    }
}

export const getVansDocuments = async () => {

    const vansCollectionRef = collection(db, 'vans');

    const querySnapshot = await getDocs(vansCollectionRef)

    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    
    return dataArr as Van[]
}

export const getVan = async (id: string) => {
    const vanDocRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(vanDocRef)

    let displayName = ''

    if(vanSnapshot.exists()) {
        const vanData = vanSnapshot.data()

        const { hostId } = vanData

        const userDocRef = doc(db, "users", hostId)
        const userSnapshot = await getDoc(userDocRef)

        if(userSnapshot.exists()) {
            displayName = userSnapshot.data().displayName
        }
    }
    
    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id,
        displayName
    }
}

export const getHostVans = async() => {
    const userID = auth.currentUser?.uid;

    if(!userID) return

    const q = query(collection(db, "vans"), where("hostId", "==", userID))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    
    return dataArr as Van[]
}

export const createUserVanFavorites = async (van: Van) => {
    const userID = auth.currentUser?.uid;

    if(!userID) return

    const { name, price, imageUrl, id, type, hostId, } = van

    const favoritesDocRef = doc(db, 'favorites', userID)
    const collectionData = collection(favoritesDocRef, 'favLists')
    const favoriteDocRef = doc(collectionData, id)
    const favoriteSnapshot = await getDoc(favoriteDocRef)
    
    const createdAt = new Date()

    if(!favoriteSnapshot.exists()) {
        try {
            return await setDoc(favoriteDocRef, {
                name,
                price,
                imageUrl,
                id,
                type,
                hostId,
                createdAt,
            })
        } catch(err) {
            throw new Error('Error adding to favorites. Please try again!', err as Error)
        }
    } 
    else {
        try {
            const { id } = van
            const querySnapshot = await getDocs(collectionData)
            const favArr = querySnapshot.docs.map(doc => ({...doc.data()}))
            const existingVan = favArr.find((fav) => fav.vanId === id)
            
            if(existingVan) {
                alert('Van already in Favorites!')
            }
        } catch(err) {
            throw new Error('Van already in Favorites!', err as Error)
        }
    }
}

export const removeUserVanFavorites = async (van: Van) => {
    const userID = auth.currentUser?.uid;

    if(!userID) return

    const { id } = van

    const favoritesDocRef = doc(db, 'favorites', userID)
    const collectionData = collection(favoritesDocRef, 'favLists')
    const favoriteDocRef = doc(collectionData, id)
    const favoriteSnapshot = await getDoc(favoriteDocRef)

    try {
        if(favoriteSnapshot.exists()) {
            return await deleteDoc(favoriteDocRef)
        }        
    } catch (error) {
        console.error("Error removing user van favorites:", error);
        throw new Error("Error removing user van favorites");
    }


}

export const getFavorites = async() => {
    const userID = auth.currentUser?.uid;

    if(!userID) return []

    const favDocRef = collection(db, `favorites/${userID}/favLists`)
    const favSnapshot = await getDocs(favDocRef)

    const favArr = favSnapshot.docs.map(doc => ({
        ...doc.data(),
    }))    
    return favArr as Favorite[]
}

export const getFavorite = async(id: string) => {
    const userID = auth.currentUser?.uid;

    if(!userID) return []
    
    const favoritesDocRef = doc(db, 'favorites', userID)
    const collectionData = collection(favoritesDocRef, 'favLists')
    const favoriteDocRef = doc(collectionData, id)
    const favoriteSnapshot = await getDoc(favoriteDocRef)
    
    return {
        ...favoriteSnapshot.data()
    }
}
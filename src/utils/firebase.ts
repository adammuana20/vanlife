// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    signInWithPopup,
    signInWithRedirect,
    getAuth,
    GoogleAuthProvider,
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
} from "firebase/firestore";

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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
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
    vanId: string;
}

export type Reservation = {
    startDate: Timestamp;
    endDate: Timestamp;
    totalPrice: number;
    vanId: string;
    createdAt: Timestamp;
}

export type Trip = {
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

    const reservationDocRef = doc(db, 'reservations', userID)
    const collectionVal = collection(reservationDocRef, 'lists')
    const reservationSnapshot = await getDoc(reservationDocRef)
    const createdAt = new Date()
    const { name, price, imageUrl, id, type } = van

    if(!reservationSnapshot.exists()) {
        const reservations = await getVanReservationsDocuments(van.id)

        const startTimestamp = Timestamp.fromDate(startDate);
        const endTimestamp = Timestamp.fromDate(endDate);
        
        const existingReservationDate = reservations.find((reservation) => 
            (reservation.startDate <= startTimestamp && reservation.endDate >= startTimestamp 
            || reservation.startDate <= endTimestamp && reservation.endDate >= endTimestamp
            || startTimestamp <= reservation.startDate && endTimestamp >= reservation.endDate))
        
        if(existingReservationDate) {
            alert('Some Dates are already Taken!')
        } else {
            try {
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
                        type
                    }
                })
                alert('Van Reserved!')
            } catch(err) {
                console.log('Error creating reservation.', err);
            }
        }
    }
}


export const getVanReservationsDocuments = async(id: string) => {
    const reservationsRef = collectionGroup(db, 'lists')
    
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
    
    const reservationDocRef = collection(db, `reservations/${userID}/lists`)
    const reservationSnapshot = await getDocs(reservationDocRef)

    const tripsArr = reservationSnapshot.docs.map(doc => ({
        ...doc.data(),
    }))
    
    return tripsArr as Reservation[]
}

export const getVansDocuments = async () => {
    const querySnapshot = await getDocs(collection(db, "vans"))  
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))    
    
    return dataArr as Van[]
}

export const getVan = async (id: string) => {
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)
    
    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    } as Van
}

export const getHostVans = async() => {
    const q = query(collection(db, "vans"), where("hostId", "==", "123"))
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

    const favoritesDocRef = doc(db, 'favorites', userID)
    const favoritesSnapshot = await getDoc(favoritesDocRef)
    const collectionVal = collection(favoritesDocRef, 'lists')

    const { name, price, imageUrl, id, type, hostId } = van
    
    const createdAt = new Date()

    if(!favoritesSnapshot.exists()) {
        try {
            await addDoc(collectionVal, {
                name,
                price,
                imageUrl,
                vanId: id,
                type,
                hostId,
                createdAt,
            })
            console.log('Van Added to Favorites!')
            return true
        } catch(err) {
            throw new Error('Error adding to favorites. Please try again!', err as Error)
        }
    } else {
        try {
            const { id } = van
            const querySnapshot = await getDocs(collectionVal)
            const favArr = querySnapshot.docs.map(doc => ({...doc.data()}))
            const existingVan = favArr.find((fav) => fav.vanId === id)
            
            if(existingVan) {
                alert('Product already in wishlist!')
            }
        } catch(err) {
            throw new Error('Product already in wishlist!', err as Error)
        }
    }
}

export const removeUserVanFavorites = async (van: Van) => {
    const userID = auth.currentUser?.uid;

    if(!userID) return

    const favoritesDocRef = collection(db, `favorites/${userID}/lists`)
    const { id } = van
    try {
        // Create a query to filter documents based on the van ID
        const querySnapshot = await getDocs(query(favoritesDocRef, where("vanId", "==", id)));

        // Iterate through the documents and delete each one
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    } catch (error) {
        console.error("Error removing user van favorites:", error);
        throw new Error("Error removing user van favorites");
    }


}

export const getFavorites = async() => {
    const userID = auth.currentUser?.uid;

    if(!userID) return []

    const favDocRef = collection(db, `favorites/${userID}/lists`)
    const favSnapshot = await getDocs(favDocRef)

    const favArr = favSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }))    
    
    return favArr as Favorite[]
}
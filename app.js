import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, query, where, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA50fe7xucCUvIqXYRgYW5viBHCNwsjmDk",
    authDomain: "my-restaurant-reviews-ba93d.firebaseapp.com",
    projectId: "my-restaurant-reviews-ba93d",
    storageBucket: "my-restaurant-reviews-ba93d.appspot.com",
    messagingSenderId: "923399343965",
    appId: "1:923399343965:web:aa68d3ba332aab4adbe2b4"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

async function getRestaurants(db) {
    const restaurantsCol = collection(db, "restaurant")
    const restaurantSnapshot = await getDocs(restaurantsCol)
    const restaurantList = restaurantSnapshot.docs.map((doc) => doc.data())
    return restaurantList;
}

const restaurantList = document.querySelector("#restaurant-list")
const form = document.querySelector('#add-restaurant-form')


function renderRestaurant(dc) {
    let li = document.createElement("li")
    let business = document.createElement("span")
    let location = document.createElement("span")
    let type = document.createElement("span")
    let ordered = document.createElement("span")
    let review = document.createElement("span")
    let score = document.createElement("span")
    let cross = document.createElement("div")

    li.setAttribute('data-id', dc.id)
    business.innerHTML = "Restaurant: " + dc.data().business
    location.innerHTML = "City: " + dc.data().location
    type.innerHTML = "Type of food: " + dc.data().type
    ordered.innerHTML = "Ordered: " + dc.data().ordered
    review.innerHTML = "Review: " + dc.data().review
    score.innerHTML = "Score: " + dc.data().score + "/5"
    cross.innerHTML = 'x'

    li.appendChild(business)
    li.appendChild(location)
    li.appendChild(type)
    li.appendChild(ordered)
    li.appendChild(review)
    li.appendChild(score)
    li.appendChild(cross)

    restaurantList.appendChild(li)

    cross.addEventListener('click', (e) => {
        e.stopPropagation()
        let id = e.target.parentElement.getAttribute('data-id')
        deleteDoc(doc(db, "restaurant", id))
    })
}

const restaurants = getDocs(collection(db, "restaurant")).then((snapshot) => {
    snapshot.forEach((doc) => {
        console.log("Here?")
        renderRestaurant(doc)
        console.log("or here?!?!")
    })
})

const q = query(collection(db, "restaurant"), where("location", "==", "Freeport, IL"))
const querySnapshot = await getDocs(q)
querySnapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data())
})

const upDoc = doc(db, "restaurant", "1RUexJuHWMGSjKLxo31g")

updateDoc(upDoc, {
    score: "4.4"
})

form.addEventListener(('submit'), (e) => {
    e.preventDefault()
    const docRef = addDoc(collection(db, "restaurant"), {
        business: form.business.value,
        location: form.location.value,
        type: form.type.value,
        ordered: form.ordered.value,
        review: form.review.value,
        score: form.score.value
    })
})
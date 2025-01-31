const scrollBtn= () =>{
    const main=document.getElementById('main-section');
    main.scrollIntoView({
        behavior:'smooth'
    })
}

// btn categories------->

const lodeCategories= async() =>{
    const res=await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    const data=await res.json();
    displayCategories(data.categories);
}


// categories way allCollection----->
const displayCategories= (data) =>{
    const categoriesBtn=document.getElementById('categories-container');
    data.forEach((item)=>{
        // console.log(item)
        const BtnDiv=document.createElement('button');
        BtnDiv.innerHTML = `
        <button onclick="loadCategoryPet('${item.category}')" id="btn-${item.category}" class="btn btn-outline lg:px-20 w-full btn-category">
        <img class="w-8 h-8 " src="${item.category_icon}" alt="">
        ${(item.category)}
        </button>
        `;
        categoriesBtn.appendChild(BtnDiv)
    })
}

// categories end_>>>

// all-collection function________------->>>>
const lodeCollection= async () =>{
    const res=await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
    const data=await res.json();
    displayCollection(data.pets);
    displaySortPrice(data.pets)
}


const displayCollection= (data) =>{
    // console.log(data)
    const allCollection=document.getElementById('all-collection');
    allCollection.innerHTML='';
    if (data.length===0) {
        allCollection.classList.remove('grid');
        allCollection.innerHTML= `
        <div class="card bg-[#13131308] rounded-md px-10  py-20">
            <figure class="">
                <img
                src="images/error.webp"
                alt="Shoes"
                class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">No Information Available</h2>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
        </div>
        `;
    }
    else{
        allCollection.classList.add('grid')
    }
    data.forEach((item)=>{
        // console.log(item)
        const petCard=document.createElement('div');
        petCard.classList="card card-compact rounded-md border p-5"
        petCard.innerHTML = `
        <figure class=" rounded">
            <img
            class="object-cover h-[160px] w-full"
            src="${item.image}"
            alt="Shoes" />
        </figure>
        <div class="mt-4 space-y-1">
            <h2 class="text-xl font-bold">${item.pet_name}</h2>
            <div class="flex gap-2">
                <img src="images/breed.png" class="h-4">
                <p class="flex items-center gap-1 text-[#131313B2] text-xs">Breed:${item.breed?`<span class"">${item.breed}</span>`:" Not Available"}</p>
            </div>
            <div class="flex gap-2">
                <img src="images/birth.png" class="h-4">
                <p class="flex items-center gap-1 text-[#131313B2] text-xs">Date:${item.date_of_birth?`<span class"">${item.date_of_birth}</span>`:" Not Available"}</p>
            </div>
            <div class="flex gap-2">
                <img src="images/gender.png" class="h-4">
                <p class="flex items-center gap-1 text-[#131313B2] text-xs">Gender:${item.gender?`<span class"">${item.gender}</span>`:" Not Available"}</p>
            </div>
            <div class="flex gap-2 border-b pb-3">
                <img src="images/price.png" class="h-4">
                <p class="flex items-center gap-1 text-[#131313B2] text-xs">Price:${item.price?`<span class"">${item.price+'$'}</span>`:" Not Available"}</p>
            </div>
            <div class="flex justify-between pt-3">
                <button onclick="petImage('${item.petId}')" class="hover:bg-[#c6e6e7] font-bold border border-[#0E7A8126] py-1 rounded px-4">
                <img src="images/like.png" class=" w-4 h-4 text-[#0E7A81]">
                </button>
                <button id="btn-${item.petId}" onclick="adoptPet('${item.petId}')" class="hover:bg-[#cbdedf] font-bold border border-[#0E7A8126] text-center rounded px-4 disabled:cursor-not-allowed disabled:opacity-40">
                <span class="text-[#0E7A81] text-sm text-center ">Adopt</span> 
                </button>
                <button onclick="petDetails('${item.petId}')" class="hover:bg-[#cbdedf] font-bold border border-[#0E7A8126] py-1 rounded px-4">
                <span class=" text-[#0E7A81] text-sm text-center ">Details</span> 
                </button>
            </div>
        </div>
        `;
        allCollection.appendChild(petCard);
    })
}

// category ways pet collection ------>

const highlightRemove = () =>{
    const buttons=document.getElementsByClassName('btn-category');
    for(let btn of buttons ){
        btn.classList.remove('highlight')
    }
}

const loadCategoryPet = async (category) =>{
    // console.log(item)
    loaderTimer()
    // remove Highlight---->
    highlightRemove()
    
    // add Highlight color ---->
    const btnHighlight=document.getElementById(`btn-${category}`)
    btnHighlight.classList.add('highlight')
    
    // fetch-----
    const res =await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const data=await res.json();
    displayCollection(data.data)
}

// <!-- Open the modal using ID.showModal() method -->
const petDetails = async(petId) =>{
    // console.log(petId)
    const res =await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data=await res.json();
    displayPetDetails(data.petData)
}
// pet_details / petData image /--->click details btn show pet details-->
function displayPetDetails(petDetails) {
    console.log(petDetails);
    const modalText = document.getElementById('modal-innerText');
    modalText.innerHTML = `
    <img src="${petDetails.image}" class="w-full h-[220px] rounded">
    <p class="text-lg font-black py-4">
    ${petDetails.pet_name}
    </p>
    <div class="grid grid-cols-2 space-y-1 border-b pb-4">
        <div class="flex gap-2">
            <img src="images/breed.png" class="h-4">
            <p class="flex items-center gap-1 text-[#131313B2] text-xs">Breed:${petDetails.breed ? `<span class"">${petDetails.breed}</span>` : " Not Available"}</p>
        </div>
        <div class="flex gap-2">
            <img src="images/birth.png" class="h-4">
            <p class="flex items-center gap-1 text-[#131313B2] text-xs">Date:${petDetails.date_of_birth ? `<span class"">${petDetails.date_of_birth}</span>` : " Not Available"}</p>
        </div>
        <div class="flex gap-2">
            <img src="images/gender.png" class="h-4">
            <p class="flex items-center gap-1 text-[#131313B2] text-xs">Gender:${petDetails.gender ? `<span class"">${petDetails.gender}</span>` : " Not Available"}</p>
        </div>
         <div class="flex gap-2">
            <img src="images/price.png" class="h-4">
            <p class="flex items-center gap-1 text-[#131313B2] text-xs">Price:${petDetails.price ? `<span class"">${petDetails.price + '$'}</span>` : " Not Available"}</p>
        </div>
        <div class="flex gap-2">
            <img src="images/gender.png" class="h-4">
            <p class="flex items-center gap-1 text-[#131313B2] text-xs">Price:${petDetails.vaccinated_status ? `<span class"">${petDetails.vaccinated_status}</span>` : " Not Available"}</p>
        </div>
    </div>

    <div class="mt-2 space-y-2">
        <p class="items-center font-black text-xs">Details Information</p>
        <p class="items-center text-[#131313B2] text-xs">${petDetails.pet_details ? `<span class"">${petDetails.pet_details}</span>` : " Not Available"}</p>
    </div>

    `;

    document.getElementById('custom-modal').showModal();
}

const petImage = async(petId) =>{
    // console.log(petId)
    const res =await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data=await res.json();
    displayImage(data.petData)
}

// click like btn show the image in side section----->

const displayImage = (data) =>{
    console.log(data)
    const showImage=document.getElementById('show-image');
    const imageDiv=document.createElement('div');
    imageDiv.innerHTML= `
    <img src="${data.image}" class="rounded">
    `;
    showImage.appendChild(imageDiv);
}

const loaderTimer= () =>{
    const load=document.getElementById('loader');
    const allPet=document.getElementById('all-pet')

    load.classList.remove('hidden')
    allPet.classList.add('hidden')
    setTimeout(()=>{
        load.classList.add('hidden');
        allPet.classList.remove('hidden');
    },2000)
}

const adoptPet =(adoptId)=>{
    console.log(adoptId)
    const adoptSuccess=document.getElementById('adopt');
    const bgAdopt=document.getElementById('bgAdopt');
    const className=Array.from(adoptSuccess.classList)
    document.getElementById(`btn-${adoptId}`).setAttribute('disabled',true)

    // if (className.includes('hidden')) {
        adoptSuccess.classList.remove('hidden');
        bgAdopt.classList.remove('hidden');
    // }
    adoptSuccess.innerHTML= `
        <div class="text-center p-20 ">
            <img class="w-24 mx-auto" src="images/hand-shake.png" alt="">
            <h1 class="text-2xl font-black font-mono">Congrats</h1>
            <p>Adoption Process Is Start For Your Pet</p>
            <p id="time" class="text-4xl font-black">3</p>
        </div>
    `;
    const time=document.getElementById('time');
    let num=3;
    const id=setInterval(()=>{
        num--;
        time.innerText=`${num}`
        if (num===1) {
            clearInterval(id)
        }
    },1000)

    modalHidden()
}

const modalHidden= () =>{
    const adoptSuccess=document.getElementById('adopt');
    const bgAdopt=document.getElementById('bgAdopt');
    setTimeout(()=>{
        bgAdopt.classList.add('hidden');
        adoptSuccess.classList.add('hidden');
    },3000)
}

lodeCategories()
lodeCollection()

// const displaySortPrice=(data)=>{
//     console.log(data)
//     const priceArray=[];
//     data.forEach((item)=>{
//         console.log(item)
//         priceArray.push(item.price)
//     })
//     console.log(priceArray.sort());
//     // console.log(priceArray.reverse());
// }
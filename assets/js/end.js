// `${data.data.results[0].thumbnail.path}/portrait_uncanny.${data.data.results[0].thumbnail.extension}` this is the src needed for the img
const PUBLIC_KEY = "407e4467d27709793035e60508d32fdf";
const PRIVATE_KEY = "d49a689257f6451c7403a124fd37f1845b3719cc";
let finalHero = localStorage.getItem('heroName');

// function to be used to restart the quiz
message1.innerHTML = "<button class=buttons2 onclick=restart1()>Restart</button>";

function restart1() {
  window.location.replace("index.html");
  //change location back to index.html
}

const fetchHero = async (chosenHero) => {
  console.log(chosenHero);
  let ts = Date.now();
  let hashKey = md5(ts + PRIVATE_KEY + PUBLIC_KEY);
  let request = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hashKey}&name=${chosenHero}`
  );
  let data = await request.json();
  generateHeroPage(data.data);
};

function generateHeroPage (heroInfo) {
  console.log(heroInfo);

  if (heroInfo.results[0].name === 'Black Widow') {
    heroInfo.results[0].description = "Natalia Alianovna 'Natasha' Romanoff, also known as Black Widow (Russian: Наталья Альяновна 'Наташа' Романова), was one of the most talented spies and assassins in the entire world and a founding member of the Avengers. Originally a KGB operative and dangerous assassin, Romanoff was recruited into S.H.I.E.L.D. by Clint Barton. Having extensive mastery in martial arts and armed with her Widow's Bite, Black Widow became one of S.H.I.E.L.D.'s most efficient agents. During one mission, she was sent undercover into Stark Industries to watch Tony Stark due to the fear that he was dying. During this mission, Romanoff assisted Stark with defeating Ivan Vanko's terrorist plots against him."
  }
  document.getElementById("hero-name").innerHTML = heroInfo.results[0].name;
  document.getElementById("description").innerHTML = heroInfo.results[0].description;
  document.getElementById("thumbnail").setAttribute("src", `${heroInfo.results[0].thumbnail.path}/portrait_uncanny.${heroInfo.results[0].thumbnail.extension}`)
}

fetchHero(finalHero);

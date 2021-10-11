const cards = document.querySelectorAll('.col-lg-2');

const days = ['Sun', 'Mon', 'Tue', 'Wend', 'Thu', 'Fri', 'Sat'];
const monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const time = new Date();
const month = time.getMonth() + 1;
const date = time.getDate();
const day = time.getDay();

const getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}

const getCurrentWheather = async (daysOffset) => {
    const date = new Date();
    date.setDate(date.getDate() - daysOffset);
    const res = await getResource(`http://api.weatherapi.com/v1/history.json?key=5841ce9cd29548d597d174607211809&q=Moscow&dt=2021-${date.getMonth()+1}-${date.getDate()}`);
    const city = res.location.name;
    const temp = res.forecast.forecastday[0].day.maxtemp_c;
    const icon = res.forecast.forecastday[0].day.condition.icon;

    return (
      `
         <div class="package">
        <p class="package-name">${city}</p>
        <hr>
        <p class="price">${date.getUTCDate()}, ${monthes[date.getMonth()]}</p>
        <hr>
        <ul class="features">
          <li>${temp}</li>
          <li><img src=${icon} alt="wheather__icon"/></li>
        </ul>       </div>
        `
    )
}

cards.forEach(async (item, index) => {
    return item.innerHTML = await getCurrentWheather(index)
})


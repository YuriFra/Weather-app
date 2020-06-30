document.getElementById('button').addEventListener('click', () => {
    let city = document.getElementById('city').value;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=9d46464b30016d545a2dbfa1a930b13b`)
        .then(response => response.json())
        .then(data => {
            const MAX_DAYS = 5;

            document.querySelector('#cityName').innerHTML = data.city.name;
            // check how many times day1 is present & push all temps to array
            let list = data.list;
            let today = new Date().toISOString().substring(0, 10);
            let dateSlice = [];
            let allTemp = [];
            let count = 0;
            for (let i = 0; i < list.length; i++) {
                let dateTxt = list[i].dt_txt;
                dateSlice.push(dateTxt.slice(0, 10));
                if (today === dateSlice[i]) {
                    count++;
                }
                allTemp.push(list[i].main.temp);
            }

            // slice the temp of each day out of the array
            let days = [];
            for (let i = 0; i < MAX_DAYS; i++) {
                let start = (i === 0) ? 0 : count + (8 * (i-1));
                days.push(allTemp.slice(start, count + (8 * i)));
            }

            //calculate average temp, rounded
            let avgTemperatures = [];
            const calculateAverage = array => (array.reduce((a, b) => a + b) / array.length).toFixed(1);

            days.forEach((day) => {
                avgTemperatures.push(calculateAverage(day));
            });

            // calculate weekdays
            for (let i = 0; i < MAX_DAYS; i++) {
                let nextDay = new Date(list[count-1].dt_txt).toDateString();
                count += 8;
                let tempNextDay = avgTemperatures[i];
                document.getElementById('target').innerHTML += `<br><h4>${nextDay}</h4><div>${tempNextDay} °C</div>`;
                console.log(count, nextDay, tempNextDay);
            }
            console.log(avgTemperatures)

        })
        .catch(error => console.error(error));
});


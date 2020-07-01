document.getElementById('button').addEventListener('click', () => {
    let city = document.getElementById('input').value;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=9d46464b30016d545a2dbfa1a930b13b`)
        .then(response => response.json())
        .then(data => {
            const MAX_DAYS = 5;
            document.getElementById('target').innerHTML = "";
            document.querySelector('#cityName').innerHTML = `<div id="cityCard"><h2>${data.city.name}</h2></div>`;
            // check how many times today is present & push all temperatures to descriptsPerDayions
            let list = data.list;
            console.log(list);
            let today = new Date().toISOString().substring(0, 10);
            let dateSlice = [];
            let allTemps = [];
            let allDescs = [];
            let allIcons = [];
            let count = 0;
            for (let i = 0; i < list.length; i++) {
                let dateTxt = list[i].dt_txt;
                dateSlice.push(dateTxt.slice(0, 10));
                if (today === dateSlice[i]) {
                    count++;
                }
                allTemps.push(list[i].main.temp);
                allDescs.push(list[i].weather[0].description);
                allIcons.push(list[i].weather[0].icon);
            }

            // slice the temperatures of each day out of the descriptsPerDayions
            let days = [];
            let descriptions = [];
            let icons = [];
            for (let i = 0; i < MAX_DAYS; i++) {
                let start = (i === 0) ? 0 : count + (8 * (i-1));
                days.push(allTemps.slice(start, count + (8 * i)));
                descriptions.push(allDescs.slice(start, count + (8 * i)));
                icons.push(allIcons.slice(start, count + (8 * i)));
            }

            //calculate average temperature, rounded
            let avgTemperatures = [];
            const calculateAverage = array => (array.reduce((a, b) => a + b) / array.length).toFixed(1);
            days.forEach((day) => {
                avgTemperatures.push(calculateAverage(day));
            });

            // check for most occurring value
            function occurrence(array) {
                if(array.length === 0) return null;
                let occurrenceMap = {};
                let maxEl = array[0], maxCount = 1;
                for(let i = 0; i < array.length; i++) {
                    let el = array[i];
                    if(occurrenceMap[el] == null)
                        occurrenceMap[el] = 1;
                    else
                        occurrenceMap[el]++;
                    if(occurrenceMap[el] > maxCount) {
                        maxEl = el;
                        maxCount = occurrenceMap[el];
                    }
                }
                return maxEl;
            }

            // push most occurring values per day into array
            let descriptsPerDay = [];
            let iconsPerDay = [];
            descriptions.forEach(array => {
                descriptsPerDay.push(occurrence(array));
            })
            icons.forEach(array => {
                iconsPerDay.push(occurrence(array));
            })
            console.log(descriptsPerDay);
            // define weekdays
            let weekDay;
            let tempWeekDay;
            for (let i = 0; i < MAX_DAYS; i++) {
                weekDay = new Date(list[count-1].dt_txt).toDateString();
                count += 8;
                tempWeekDay = avgTemperatures[i];
                document.getElementById('target').innerHTML +=
                    `<div class="card">
                        <div class="txt">
                          <div class="day">${weekDay}</div>
                          <div class="description">${descriptsPerDay[i]}</div>
                          <div class="temp">${tempWeekDay}°C</div>
                        </div>
                        <img class="icon" src="https://openweathermap.org/img/w/${iconsPerDay[i]}.png" alt="weatherIcon">
                     </div>`;
                console.log(count, weekDay, tempWeekDay);
            }
            console.log(avgTemperatures);
            document.getElementById('input').value = '';
        })
        .catch(error => console.error(error));
});

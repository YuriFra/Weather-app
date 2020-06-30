document.getElementById('button').addEventListener('click', () => {
    let city = document.getElementById('city').value;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=9d46464b30016d545a2dbfa1a930b13b`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('#cityName').innerHTML = data.city.name;
            console.log(data);
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
            let temp1 = allTemp.slice(0, count);
            let temp2 = allTemp.slice(count, count + 8);
            let temp3 = allTemp.slice(count + 8, count + 16);
            let temp4 = allTemp.slice(count + 16, count + 24);
            let temp5 = allTemp.slice(count + 24, count + 32);
            console.log(temp1, temp2, temp3, temp4, temp5);

            //calculate average temp, rounded
            let avgTemp = [];
            const avgArr = array => (array.reduce((a, b) => a + b) / array.length).toFixed(1);
            let avgTemp1 = avgArr(temp1);
            let avgTemp2 = avgArr(temp2);
            let avgTemp3 = avgArr(temp3);
            let avgTemp4 = avgArr(temp4);
            let avgTemp5 = avgArr(temp5);
            avgTemp.push(avgTemp2, avgTemp3, avgTemp4, avgTemp5);
            console.log(avgTemp1, avgTemp2, avgTemp3, avgTemp4, avgTemp5);

            // calculate weekdays
            let currentDay = new Date().toDateString();
            document.getElementById('target').innerHTML = `<h4>${currentDay}</h4><div>${avgTemp1} °C</div>`;
            let nextDay;
            let tempNextDay;
            console.log(currentDay);
            for (let i = 0; i < 4; i++) {
                nextDay = new Date(list[count].dt_txt).toDateString();
                count += 8;
                tempNextDay = avgTemp[i];
                document.getElementById('target').innerHTML += `<br><h4>${nextDay}</h4><div>${tempNextDay} °C</div>`;
                console.log(count, nextDay, tempNextDay);
            }

        })
        .catch(error => console.error(error));
})


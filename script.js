document.getElementById('button').addEventListener('click', () => {
    let city = document.getElementById('city').value;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=d189d4b89921709c6f105b85ff25c65a`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('#cityName').innerHTML = data.city.name;
            console.log(data.list);
            // check how many times day1 is present and push to array & push all temps to array
            let today = new Date().toISOString().substring(0, 10);
            let dateSlice = [];
            let day1 = [];
            let allTemp = [];
            let minTemp = [];
            let maxTemp = [];
            for (let i = 0; i < data.list.length; i++) {
                let dateTxt = data.list[i].dt_txt;
                dateSlice.push(dateTxt.slice(0, 10));
                if (today === dateSlice[i]) {
                    day1.push(dateSlice[i]);
                }
                allTemp.push(data.list[i].main.temp);
                minTemp.push(data.list[i].main.temp_min);
                maxTemp.push(data.list[i].main.temp_max);
            }
            console.log(day1, minTemp, maxTemp);

            // slice the temp of each day out of the array
            let temp1 = allTemp.slice(0, day1.length);
            let temp2 = allTemp.slice(day1.length, day1.length + 8);
            let temp3 = allTemp.slice(day1.length + 8, day1.length + 16);
            let temp4 = allTemp.slice(day1.length + 16, day1.length + 24);
            let temp5 = allTemp.slice(day1.length + 24, day1.length + 32);
            console.log(temp1, temp2, temp3, temp4, temp5);

            //calculate average temp, rounded
            const avgArr = array => (array.reduce((a, b) => a + b) / array.length).toFixed(0);
            let avgTemp1 = avgArr(temp1);
            let avgTemp2 = avgArr(temp2);
            let avgTemp3 = avgArr(temp3);
            let avgTemp4 = avgArr(temp4);
            let avgTemp5 = avgArr(temp5);
            console.log(avgTemp1, avgTemp2, avgTemp3, avgTemp4, avgTemp5);

            let weekDay = new Date(today).getDay();
            console.log(weekDay);
            for (let i = 0; i <= 6; i++) {

            }
                //const weekDay = today.toLocaleString('default', { weekday: 'short'});
                //console.log(weekDay);

                function showWeather() {
                    let template = document.getElementsByTagName("template")[0];
                    let clone = template.content.cloneNode(true);
                    clone.querySelector('.weekDay').innerHTML = city;
                    clone.querySelector('.dayTemp').innerHTML = avgTemp1.toString();
                    document.querySelector('#target').appendChild(clone);
                }
            showWeather();
        })
        .catch(error => console.error(error));
})


async function getApi(results) {
    //The documentation 
    // https://randomuser.me/documentation
    const requestUrl = `https://randomuser.me/api/?results=${results}`;

    const response = await fetch(requestUrl);

    const data = await response.json();
    console.log(data);
}

getApi(10);

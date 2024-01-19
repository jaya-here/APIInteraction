export async function getInput({beforeDate, afterDate, page}) {

    function convertDate(date)
    {
        date = date.slice(0,7).split('-')
        return date[1]+"-"+date[0]
    }

    let baseURL = `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`
    let query = baseURL

    if (beforeDate !== null && beforeDate !== '') 
    {
        beforeDate = convertDate(beforeDate)
        query = query + `&brewed_before=${beforeDate}`
    }

    if (afterDate !== null && afterDate !== '') 
    {
        afterDate = convertDate(afterDate)
        query = query + `&brewed_after=${afterDate}`
    }
    
    try {
        let response = await fetch(query)
        let data = await response.json()
        return {data:data,
        hasMore:(data?.length===10?true:false)}

    }

    catch (err)
    {
        throw new Error('Error fetching data')
    }
}
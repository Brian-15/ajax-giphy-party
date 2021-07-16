console.log("Let's get this party started!");

const [submitButton, removeImgsButton] = $('button');
const form = $('form');
let currRow = 0;

form.on('submit', getGiphy);

async function getGiphy(evt) {

    evt.preventDefault();
    
    // get search term
    const term = $('#searchTerm')[0].value;

    // get JSON data from Giphy API
    const result = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${term}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`);;

    // generate GIF element and append to table element
    appendGif(result.data.data[0]);
}

function appendGif(data) {

    const $row = $(`#${currRow}`);

    // set up GIF element
    const gif = $('<iframe>');
    gif.attr({
        'src': data.embed_url,
        'width': data.images["480w_still"].width,
        'height': data.images["480w_still"].height,
    })
    console.log(data);

    // set up cell
    const cell = $('<td>');
    cell.append(gif);
    
    if ($row.children().length === 3) {
        currRow++;
        const newRow = $('<tr>');
        newRow.attr('id', currRow);
        $('table').append(newRow);
    }

    $(`#${currRow}`).append(cell);
}
// Brian Cirieco - AJAX Giphy Party
// global variables
const [submitButton, removeGIFButton] = $('button');
const form = $('form');
let currRow = 0;

form.on('submit', (evt) => evt.preventDefault());

// event handlers

// handle submit button
$(submitButton).on('click', getGiphy);

// handle remove button
$(removeGIFButton).click(handleRemoveGIFs);

// handler function for remove button
function handleRemoveGIFs() {
    currRow = 0;
    $('tr').remove();
    $('table').append($('<tr>').attr('id', 0));
}

// handler function for submit button
async function getGiphy(evt) {

    // get search term
    const term = $('#searchTerm')[0].value;

    // get JSON data from Giphy API
    const result = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${term}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`);;

    // generate GIF element and append to table element
    appendGIF(result.data.data[0]);
}

// add GIF to the 
function appendGIF(data) {

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
    
    // check if row is full
    if ($row.children().length === 3) {
        currRow++;
        const newRow = $('<tr>');
        newRow.attr('id', currRow);
        $('table').append(newRow);
    }

    $(`#${currRow}`).append(cell);
}
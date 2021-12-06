// import the data from data.js file
// declare as a constant because this won't change
const tableData = data;

// Reference the HTML table using d3
//Look for any tbody tags in the HTML
var tbody = d3.select("tbody");

//Build filter table
function buildTable(data) {
    //Clear any previous data by setting the table equal to ""
    tbody.html("")
    //Use forEach (arrays only) to loop through each object in the data
    // arrow function is a cleaner way to write a forEach
    data.forEach((dataRow)=> {
        //use let because this variable's scope is limited to this function
        //Find the tbody tag and add a table row
        let row = tbody.append("tr");
        //Set up another function: put each sighting into its own row of data
        //object.values = ref one object from the array of UFO sightings
        //dataRow argument = put the values into the dataRow
        //forEach((val) = specify that we want one object per row
        //Loop through each field in the dataRow and add each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            //Setup to append data to table data tag
            let cell = row.append("td");
            //Extract the text from the value
            cell.text(val);
            }
        );
    });
}

//Use d3 data driven documents to filter by date
function handleClick() {
    //select all tags with id datetime, grab value
    let date = d3.select("#datetime").property("value");
    //set default filter for original table data
    let filteredData = tableData;
    //if there's a date set, use that as a filter. if not, return default
    if (date) {
        //filter data based on date value
        //set row = any row where the date field === date
        filteredData = filteredData.filter(row => row.datetime === date);
    };
    //Rebuilt table using filter data. If no date entered, it will just be original tableData.
    buildTable(filteredData);
}
// Look for tags with idfilter button. Execute handleClick on click action
d3.selectAll("#filter-btn").on("click", handleClick);
// Build table when the page loads
buildTable(tableData);
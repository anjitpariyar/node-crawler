# Node.js Crawler

This is a Node.js web crawler that grabs product details from a given website.

## By default,

the crawler will fetch data from the URL specified in the `index.ts` file. You can modify this URL by changing the value of the `url` property in the `  const paginationURLsToVisit = ["https://scrapeme.live/shop"];` file.

The crawler will output the product details to the console. If you want to save the data to a file, you can modify the code in `index.ts` to write the data to a file instead.

## Installation

To install the necessary dependencies, run: `yarn`

## Dependencies

This project relies on the following dependencies:

- axios
- cheerio

## Development

To run the project in development mode with live reloading, run: `yarn dev`

## to run specifi file

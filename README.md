# Node.js Crawler

Node Crawler is a web scraping tool built with Node.js that allows you to extract data from websites and export to json. It's a flexible and customizable solution for scraping data for various purposes.

**Note**: Be aware that websites may change their structure over time, so ensure that the class names and selectors used in this script are up to date.

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

## to run specific file

`yarn run ts-node src/category.ts`

import {ICronTodo, IMemoTodo, ITodo, TodoListType} from "./dataTypes";

import {random, range} from "../../../utils/common";


const DAY = 60 * 60 * 24 * 1000;

const WORDS_SAMPLE = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mi turpis, laoreet et rutrum non, facilisis vel sapien. Pellentesque eu sem nec nulla faucibus dictum. Pellentesque lacinia mi vitae enim iaculis, vel elementum ex rutrum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque eget turpis eros. Mauris placerat est at est blandit, et pharetra eros commodo. Sed suscipit non purus sit amet sollicitudin. Sed ac sem sit amet neque dignissim porttitor sit amet et nulla. Integer dictum dolor ac consequat imperdiet. Maecenas dictum lacus lacus, at bibendum ipsum cursus in. Ut neque orci, ultrices efficitur faucibus quis, cursus et diam. Nunc egestas convallis purus. In ut vehicula odio. Nunc eget nulla et risus rhoncus sagittis. Nunc malesuada gravida dolor, a posuere eros dignissim eget. Nulla et consectetur leo.

Phasellus nec eros eu ante fermentum gravida. Pellentesque eleifend eros a elit dictum consequat. Aenean eleifend lacinia elementum. Phasellus ut sagittis magna. Pellentesque iaculis quam a ante fringilla lacinia. Proin porttitor consectetur orci, non fermentum felis bibendum quis. Phasellus auctor turpis at ante malesuada, eu pulvinar nunc porttitor. Mauris vestibulum convallis dui id viverra.

Praesent imperdiet, risus et aliquam fringilla, est sem pellentesque ex, et suscipit mauris purus in justo. Sed vel massa non sem tincidunt convallis. Aenean sit amet libero suscipit, dictum neque eu, consectetur justo. Nam suscipit ligula elit, vitae blandit ex hendrerit id. In dictum, sem sit amet hendrerit sollicitudin, velit lorem fringilla elit, ac semper justo orci et ipsum. In eleifend ultricies molestie. Sed mauris leo, vulputate at ligula sit amet, condimentum dignissim nisl. Phasellus pretium massa sit amet velit tincidunt dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean lobortis, felis eu vehicula rutrum, dolor erat fringilla nunc, eget convallis lorem risus a lacus. Mauris eget mattis tortor, quis hendrerit orci. Pellentesque at odio dui. Quisque vel mauris lorem.

Nulla at rhoncus lacus. Suspendisse dictum mollis ligula, eget commodo sem sagittis sit amet. Fusce lorem ex, molestie vel nibh eget, blandit porta nulla. Aliquam facilisis luctus urna ac tincidunt. Vivamus aliquet diam vel lorem tempor ultrices. Sed sagittis mi libero, et rutrum justo congue quis. In finibus lorem eu ex semper porttitor quis quis purus.

Cras diam augue, tristique scelerisque enim ut, fringilla vestibulum velit. In rhoncus malesuada tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque efficitur hendrerit posuere. Sed ut ex posuere, pretium orci id, posuere eros. Praesent dapibus consectetur quam et malesuada. Vestibulum elementum orci ultricies tempor mattis. Praesent justo tortor, pretium eu ligula at, dapibus tempus nisl. Mauris sodales, magna et commodo imperdiet, massa eros efficitur lectus, sit amet facilisis ipsum nisl eget magna. Aenean ac efficitur sapien, a malesuada est. Suspendisse sodales rutrum leo nec pharetra. Nulla euismod risus vitae leo pulvinar euismod. Phasellus efficitur purus ut orci vehicula, eu rhoncus tellus varius. 
`.replace("\n", "").split(" ");

const getRandomWord = () => WORDS_SAMPLE[random(WORDS_SAMPLE.length)];

const getRandomText = (maxLength) => {
  let topLimit = random(maxLength);
  while (topLimit === 0)
    topLimit = random(maxLength);

  return range(2, topLimit).map(getRandomWord).join(" ");
};

const getRandomDates = () => ({
  date: new Date(new Date().valueOf() + DAY * random(3, 0, 3)).setHours(random(23), random(59), 0, 0),
  created: new Date(new Date().valueOf() - DAY * random(3, 0, 3)).setHours(random(23), random(59), random(59), random(59)),
  updated: new Date(new Date().valueOf() - DAY * random(1, 0, 3)).setHours(random(23), random(59), random(59), random(59)),
});

let idCounter = 1;

const createMemoTodo: () => IMemoTodo = () => ({
  id: idCounter++,
  type: "MEMO",
  title: getRandomText(10),
  description: random(2) ? getRandomText(36) : null,
  duration: null,
  status: "suspense",
  ...getRandomDates()
});

const createTodo: () => ITodo = () => ({
  id: idCounter++,
  type: "TODO",
  title: getRandomText(10),
  description: random(6) ? getRandomText(64) : null,
  duration: random(16000), // seconds
  status: "suspense",
  ...getRandomDates()
});

const createCronTodo: () => ICronTodo = () => ({
  id: idCounter++,
  type: "CRON",
  title: getRandomText(10),
  description: random(2) ? getRandomText(42) : null,
  duration: random(6000), // seconds
  status: "suspense",
  schedule: "",
  ...getRandomDates()
});

export const getTestTodoes: () => TodoListType = () => [
  ...range(0, random(6)).map(createMemoTodo),
  ...range(0, random(6)).map(createTodo),
  ...range(0, random(6)).map(createCronTodo),
];

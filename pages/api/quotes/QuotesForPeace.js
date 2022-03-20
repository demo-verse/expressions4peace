import { useState, React, useEffect } from "react";

const QuotesForPeace = () => {
  const arrayOfQuotes = [
    "A dream you dream alone is only a dream. A dream you dream together is reality. —Yoko Ono",
    "If someone thinks that peace and love are just a cliche that must have been left behind in the 60s, that’s a problem. Peace and love are eternal. -John Lennon",
    "Peace of mind for five minutes, that's what I crave. —Alanis Morissette",
    "When things change inside you, things change around you. —Unknown",
    "Everyone thinks of changing the world, but no one thinks of changing himself. — Leo Tolstoy",
    "If you are depressed you are living in the past if you are anxious you are living in the future, if you are at peace, you are living in the present.—Lao Tzu",
    "Peace cannot be kept by force; it can only be achieved by understanding. —Albert Einstein",
    "Sometimes it falls upon a generation to be great. You can be that generation. —Nelson Mandela",
    "I’ve learnt that no one is too small to make a difference. Your silence is almost worst of all. —Greta Thunberg ",
    "Let the world unite, no fussing no fighting. —Paulette Walker",
    "If we are to have peace on earth.. Our loyalties must transcend our race, our tribe, our class, and our nation; and this means we must develop a world perspective. —Martin Luther King, Jr.",
    "If we have no peace, it is because we have forgotten that we belong to each other. —Mother Teresa",
    "The day the power of love overrules the love of power, the world will know peace. —Mahatma Gandhi",
    "A post-truth democracy would no longer be a democracy. —Jürgen Habermas",
    "Why only one song, one speech, one text at a time? when our lips speak together. —Luce Irigaray",
    "If everyone fought for their own convictions there would be no war. —Leo Tolstoy",
    "Words can do unspeakable good and cause terrible wounds. —Sigmund Freud",
    "The question is not what you look at, but what you see. —Henry David Thoreau",
    "A concept is a brick. It can be used to build a courthouse of reason or it can be thrown through the window. —Gilles Deleuze",
    "No Man is an Island. —John Donne",
  ];

  // Choose random quote from array
  const [quotes, setQuotes] = useState(arrayOfQuotes);
  const [oneQuote, setOneQuote] = useState();

  const printAllQuotes = () => {
    <div className="textual__list">
    {quotes.map((quote, index) => {
      
      console.log(quote)
      return (
        <div className="expression__item" key={index}>
          <div className="expression__item-text">{quote}</div>
        </div>
      );
    })}
  </div>

const getRandomQuote = () => {

  return quotes[Math.floor(Math.random()* quotes.length)];
}

  // const saveARandomQuoteLocally = () => {
  //   //items[Math.floor(Math.random()*items.length)];
  //   localStorage.setItem("textual", JSON.stringify(textual));

  //   if (textual) {
  //     setTextual(textual);
  //   }
  // }
  // const getLocalQuote = () => {
  //   const textual = JSON.parse(localStorage.getItem("textual"));
  //   if (textual) {
  //     setTextual(textual);
  //   }
  // }


// const printRandomQuote = () => {
//   setOneQuote(getRandomQuote());
//   return (
//     <div className="expression__item" key={index}>
//       <div className="expression__item-text">{oneQuote}</div>
//     </div>
//   );
// }
  

  
  return (
   
    <div className="masthead">
      <h1>{printRandomQuote()}</h1>
      <div className="expression__item" key={index}>
      <div className="expression__item-text">{oneQuote}</div>
    </div>
    
    </div>
  );
};
}




// const ExpressionsList = ({ textual }) => {
//   return (
//     <div className="textual__list">
//       {
//         arrayOfQuotes.map((expression, index) => {
//           return (
//             <div className="expression__item" key={index}>
//               <div className="expression__item-text">{expression}</div>
//             </div>
//           )
//         })
//       }
//     </div>
//   )
// }

//   QuotesForPeace.displayName = 'QuotesForPeace';

export default QuotesForPeace;

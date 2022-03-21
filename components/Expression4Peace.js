import { useState, useEffect } from "react";
import { supabase } from "../utils/SupabaseClient";

export default function Expression4Peace() {
  const [expressions, setExpressions] = useState([]);

  /*
  column names and types for table, 'expressions': 
  title: Give the expression a name :text
  textual: Add textual content :text
  img_url: Add a link to an image file :text
  audio_url: Add a link to a sound file :text
  mint_now: Mint now or give it some time to yield $wisdom :boolean (default: false),
  to_be_minted_at: 
  
*/
  const [expression, setExpression] = useState({
    title: "",
    textual: "",
    img_url: "",
    audio_url: "",
    mint_now: false,
    to_be_minted_at: null,
  });
  const { title, textual, img_url, audio_url, mint_now, to_be_minted_at } =
    expression;

  useEffect(() => {
    fetchExpressions();
  }, []);

  async function fetchExpressions() {
    const { data } = await supabase.from("expressions").select();

    setExpressions(data);

    console.log("data", data);
  }

  async function createExpression() {
    await supabase
      .from("expressions")
      .insert([
        {
          title: "",
          textual,
          img_url: "",
          audio_url: "",
          mint_now: "",
          to_be_minted_at,
        },
      ])
      .single();
    // setExpression({ })
  }

  // async function deleteExpression (id) {}

  //     return (
  //         <div className='App'>

  //         </div>
  //     );

  // //   const [loading, setLoading] = useState(true)
  // //   const [title, setTitle] = useState(null)
  // //   const [textualContent, setTextualContent] = useState(null)
  // //   const [imgUrl, setImgUrl] = useState(null)
  // //   const [audioUrl, setAudioUrl] = useState(null)
  // // const [toBeMintedAt, setToBeMintedAt] = useState(null)
  // // const [mintNow, setMintNow] = useState(false)
}

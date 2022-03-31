import { useState, useEffect } from "react";
import { supabase } from "../utils/SupabaseClient";

export default function Expression4Peace() {
  const [expressions, setExpressions] = useState([]);


  const [expression, setExpression] = useState({
    title: "",
    textual: "",
    img_url: "",
    audio_url: "",
    video_url: "",
    phase: "",
    number_of_acks: 0,
    number_of_recs: 0
  });
  const { title, textual, img_url, audio_url, video_url, phase, number_of_acks, number_of_recs } =
    expression;

  useEffect(() => {
    fetchExpressions();
  }, []);

  async function fetchExpressions() {
    const { data } = await supabase.from("expressions").select();

    setExpressions(data);

    console.log("data", data);
  }

  async function createExpression(expression) {
    await supabase
      .from("expressions")
      .insert([
        {
          title: expression.title,
          textual: expression.title,
          img_url: expression.img_url,
          audio_url: expression.audio_url,
          video_url: expression.video_url
          to_be_minted_at: expression.,
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

import { Request, Response } from "express";
import { SlidesDocument, Slides } from "../models";

export async function createInitSlides() {
  const sliders = await Slides.find();
  if (sliders.length == 0) {
    const slides = [
      {
        url: "https://imgcps.jd.com/ling4/10067920683440/5aS55YWL5oqY5omj6ZKc5oOg/5pS-5b-D5peg5b-n6LSt/p-60541365d250103053e030ee/110b1811/cr_1125x449_0_166/s/q70.jpg",
      },
      {
        url: "https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000267/1234975/FocusFullshop/CkNqZnMvdDEvMjM3ODEwLzM3LzgzMDIvNDg5MDI5LzY1N2Y1YWI2RjUwYmQ1N2ExLzlmZDg2NDA5NmRiNTFiZGIucG5nEgs1MDktdHlfMF80NzABOIuLekITCg_nu7Tku5blpbbppa7mlpkQAUITCg_niannvo7ku7fmm7TkvJgQAkIQCgznq4vljbPmiqLotK0QBkIKCgblipvojZAQB1ifsEs/cr_1125x449_0_166/s/q70.jpg",
      },
      {
        url: "https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000268/3513141/FocusFullshop/CkRqZnMvdDEvMTg0MTM1LzM0LzEzMjI0LzI3MTg4MC82MGU2YmYwM0U0NTUwY2QxNS82MzNhMGMyOTBiMThlMTViLnBuZxILNTE2LXR5XzBfODgwATiMi3pCHAoY5LqU6LC356Oo5oi_5Yay6aWu6LC354mpEAFCDQoJ6LSt6L-H55i-EAJCEAoM56uL5Y2z5oqi6LStEAZCCgoG5Yqb6I2QEAdYtbbWAQ/cr_1125x449_0_166/s/q70.jpg",
      },
      {
        url: "https://imgcps.jd.com/ling4/10067920683440/5aS55YWL5oqY5omj6ZKc5oOg/5pS-5b-D5peg5b-n6LSt/p-60b4acacfe543e8ec85e6188/32aa3813/cr_1125x449_0_166/s/q70.jpg",
      },
      {
        url: "https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000269/14670786344/FocusFullshop/CkNqZnMvdDEvMjI3MjgxLzE3LzkzMDkvOTMyNzk1LzY1N2Y1YjhlRmQ4Y2FjZTM3L2I4ZWUxM2JkZTBkMzIwODcucG5nEgs0NjItampfMF8yMDACOI2LekITCg_lpZTlr4zokaHokITphZIQAUIQCgzmu6E4OTnlh48xNjAQAkIQCgznq4vljbPmiqLotK0QBkIKCgbotoXlgLwQB1io3snTNg/cr_1125x449_0_166/s/q70.jpg",
      },
      {
        url: "https://m15.360buyimg.com/mobilecms/s1062x420_jfs/t1/229909/4/4889/66046/65658952Ff51d8505/bef130a510ea1175.jpg!cr_1053x420_4_0!q70.jpg",
      },
    ];
    Slides.create(slides);
  }
}

export const list = async (_req: Request, res: Response) => {
  let slides: SlidesDocument[] = await Slides.find();
  res.json({ success: true, data: slides });
};

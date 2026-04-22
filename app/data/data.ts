import { StaticImageData } from "next/image"
// Avatars images import
import BriannaVilla from "@/public/images/cleaning/avatars/brianna-villa.png"
import BrigitteCotto from "@/public/images/cleaning/avatars/bredgit.png"
import EvgeniaOstrovskaya from "@/public/images/cleaning/avatars/evgenia-ostrovskaya.png"
import IraKoroleva from "@/public/images/cleaning/avatars/ira-koroleva.png"
import BankrollBombshell from "@/public/images/cleaning/avatars/bankroll-bombshell.png"
import ShushanArakelyan from "@/public/images/cleaning/avatars/shushan.png"
import RubaAlBaroudi from "@/public/images/cleaning/avatars/ruba-al-baroudi.png"
import JustinRamirez from "@/public/images/cleaning/avatars/justin-ramirez.png"
import Dias from "@/public/images/cleaning/avatars/dias-sasembai.png"
import ChrisPizzi from "@/public/images/cleaning/avatars/chris-pizzi.png"
import BlankaDominguez from "@/public/images/cleaning/avatars/blanka.png"
import JillianChamberlain from "@/public/images/cleaning/avatars/jilian-chemberlen.png"
import DaniyarIrbash from "@/public/images/cleaning/avatars/daniyar-irbash.png"
import ZamirZarifov from "@/public/images/cleaning/avatars/zamir.png"
import SarahS from "@/public/images/cleaning/avatars/sara-s.png"
import LuisOrtiz from "@/public/images/cleaning/avatars/luis-ortiz.png"
import BenMichael from "@/public/images/cleaning/avatars/ben-michael.png"
import BerkatGizatov from "@/public/images/cleaning/avatars/berkat-galizov.png"
import SamEdwards from "@/public/images/cleaning/avatars/sam-edwards.png"
import RosaChen from "@/public/images/cleaning/avatars/rosa-chen.png"
import ValeriaFekete from "@/public/images/cleaning/avatars/valeria-fekketti.png"
import HowardFleisher from "@/public/images/cleaning/avatars/howard-fleisher.png"
import WhitneyPakui from "@/public/images/cleaning/avatars/whitney-paqui.png"
import MedetZhanurbay from "@/public/images/cleaning/avatars/medet-zhandurbay.png"
import WomanInTheWorld from "@/public/images/cleaning/avatars/woman-in-the-world.png"
import BetsyBrooks from "@/public/images/cleaning/avatars/betsy-brooks.png"

// Prices for couch and carpet cleaning
export interface IItem {
  item: string
  priceBefore: number
  priceAfter: number
}
export interface IPrice {
  img: StaticImageData
  url: string
  category: string
  items: IItem[]
}

export interface ITestimonial {
  text: string
  image: StaticImageData
  userName: string
}

export const testimonials: ITestimonial[] = [
  {
    text: "Absolutely amazing service! The cleaners were super professional detail-oriented, and left my home spotless. They took their time to make sure everything was done right, and I love how fresh and clean my place feels now. Booking was easy, and communication was great from start to finish. Definitely planning to use them regularly and recommend them to my friends. Thx guys",
    image: DaniyarIrbash,
    userName: "Daniyar Ibrash",
  },
  {
    text: "Absolutely amazing service! The team was professional, thorough, and left my home spotless. They paid attention to every detail, from deep cleaning the kitchen to making the my bedroom shine. The booking process was easy, and the cleaners arrived on time with all their own supplies. I highly recommend them for anyone looking for quality cleaning! Will definitely be using their services again",
    image: ZamirZarifov,
    userName: "Zamir Zafirov",
  },
  {
    text: "Playa Cleaning did an excellent job! Alesia and her team were professional, friendly, and thorough. My place looks absolutely spotless and feels so fresh. I’m really happy with the results and will definitely use them again for regular scheduled cleans. Feels so great coming back to a super clean home. Definitely recommend!",
    image: SarahS,
    userName: "Sara S.",
  },
  {
    text: "Vlad was absolutely awesome. Communication was on point and they squeezed us in last minute. He did not rush the job and took a lot of pride in making sure our couch and rug were as clean as possible. I will be using them again and referring them to friends as well. If you’re looking for quality and affordability, you found the right cleaning service!",
    image: LuisOrtiz,
    userName: "Luis Ortiz",
  },
  {
    text: "I couldn’t be happier with the cleaning service by Olesia! She did an amazing job on my apartment in Playa Vista. The attention to detail was impressive, from the bathroom to the kitchen. She was professional, reliable, and left the place looking better than I expected. Highly recommend to anyone looking for a thorough and trustworthy cleaner!",
    image: BenMichael,
    userName: "Ben Michael",
  },
  {
    text: "I’m beyond impressed with the service! My 3 bedroom home is spotless every detail was taken care of with precision and professionalism. The Alice team was amazing, super thorough, and left everything looking brand new. Absolutely top-notch! I’ll definitely be booking again! Loved in my upstairs",
    image: BerkatGizatov,
    userName: "Bekzat Gizatov",
  },
  {
    text: "They are very good, if you want your carpets deep cleaned, please give them a call!! I highly recommend, & very good prices in town👌 they won't disappoint. :)",
    image: BriannaVilla,
    userName: "Brianna Villa",
  },
  {
    text: "All I can say is WOW. I was honestly blown away by how amazing Alesia is!!! We hired her for move-out cleaning before we handed over the apartment. I'd never seen the apartment this fresh and clean. Alesia was incredibly thorough and went through literally every little tiny corner of the place. The floors are sparkling. I cannot recommend her enough!! THANK YOU Alesia!!!",
    image: SamEdwards,
    userName: "Sam Edwards",
  },
  {
    text: "Vlad did an amazing job cleaning two couches! They are like new!! Also timely and professional. Totally recommend 👍🏻",
    image: RosaChen,
    userName: "Rosa Chen",
  },
  {
    text: "It feels amazing to come home to such a clean space! The shower, the stove, the sink — everything looks spotless. Even the toothbrush cups are sparkling clean! I was especially surprised to see the water stains on the bathroom sink completely gone — I had tried to scrub them off before and thought they were there to stay I’m really happy with the results and we’ll definitely be reaching out again. Thank you so much for the great work!",
    image: ValeriaFekete,
    userName: "Valeria Fekete",
  },
  {
    text: "Let me start by saying that I had been spoiled. I had had the same wonderful cleaning person for almost 15 years. Unfortunately she retired. After that the search began. I went through several “cleaning crews” that showed up when they felt like it or just came chronically late with no phone call letting me know. Others wanted to nickel and dime for any request I made. Then I was referred to Vladimir and Alicia. I could not be happier. They are fantastic! If they say they will be at your house at 9:00 they are there at 9:00. They are very professional, do great work, and if you ask them to pay special attention to an area they are happy to do it. This review is long overdue as I have been with them for almost 2 years now. If you’re looking for someone that believes in customer service give them a call. You will be happy you did.",
    image: HowardFleisher,
    userName: "Howard Fleischer",
  },
  {
    text: "Just had my first service from Angara Cleaning for a Move—in Move out cleaning. Words can’t express how satisfied and happy we are. They were punctual and very nice. Found my new cleaning professionals, thank you again!",
    image: WhitneyPakui,
    userName: "Whithney Paqui",
  },
  {
    text: "I book Angara Cleaning Services every month and they never disappoint! Their team is always thorough and professional. This time, they deep cleaned my kitchen scrubbing every corner, cleaning inside my appliances. My kitchen feels fresh and it’s like new again. I highly recommend them and will definitely continue using their services!",
    image: MedetZhanurbay,
    userName: "Medet Zhandyrbai",
  },
  {
    text: "Amazing! Cannot recommend enough! They went above and beyond! Our place was left spotless and prices are very reasonable! We will be using them again and recommending to all friends and family. Very kind people that worked really hard to leave our place spotless!",
    image: BrigitteCotto,
    userName: "Brigitte Cotto",
  },
  {
    text: "The most amazing service I have ever received. He was able to work with my budget as well, which speaks to the quality and customer service for this business if I ever need any carpet cleaning or Upholstery cleaning I will definitely use them over and over and over again. I recommend them 10×10.",
    image: WomanInTheWorld,
    userName: "Woman in the World",
  },
  {
    text: "A+++. Vladimir went above and beyond and he was totally non-judgmental about how gross our couch had become 🫣 He was super nice, very thorough, and the couch looks amazing now. Also the prices were beyond reasonable. He also made our headboard look brand new. We will be repeat customers for sure",
    image: BetsyBrooks,
    userName: "Betsy Brooks",
  },
  {
    text: "Very nice and professional people, extremely attentive to the details. I’ve never seen our apartment so sparkling clean, even when we’ve just moved after deep cleaning from our landlord. They did more than I asked about and quality/price is great. Also, they do carpet and upholstery cleaning. Real gem that is hard to find!",
    image: EvgeniaOstrovskaya,
    userName: "Ievgeniia Ostrovska",
  },
  {
    text: "Truly deep cleaning, I had no other service clean behind all the furniture, even the heaviest items. They also suggest organizing the drawers and fridge. I keep my gardening stuff on the balcony, and it's always dirty, I found it nice and pretty today. My home looks great after cleaning and Olesia is friendly and attentive.",
    image: IraKoroleva,
    userName: "Ira Koroleva",
  },
  {
    text: "Today I got the carpet cleaned in a 3 bedroom apartment for a great price. They were on time and ready to get the job done. Their service was above and beyond I will definitely be using them again. Thank you for your kindness and prompt response and service. Super appreciate you 🌟💯🌟💯",
    image: BankrollBombshell,
    userName: "Bankroll Bombshell",
  },
  {
    text: "Olesya and the team did a wonderful job cleaning our apartment, this was hands down the best deep cleaning service I have used so far. They left our apartment spotless.",
    image: ShushanArakelyan,
    userName: "Shushan Arakelyan",
  },
  {
    text: "Absolutely flawless experience! They were so easy to work with, friendly, and professional. I was working from home, and it was so seamless I barely noticed they were cleaning. Everything was left spotless. Highly recommend!",
    image: RubaAlBaroudi,
    userName: "Ruba Al Baroudi",
  },
  {
    text: "Incredible work! They went above and beyond and did a phenomenal job cleaning our place! Thanks so much. Would 100% recommend.",
    image: JustinRamirez,
    userName: "Justin Ramirez",
  },
  {
    text: "Thanks Vlad and Alice a lot for your job. I’m satisfied with their work inside and outside of work. I’m especially amazed with their work on couch. God bless you!",
    image: Dias,
    userName: "Dias Sarbay",
  },
  {
    text: "Playa Deep Cleaning was professional, polite and did great work. I will be using them again soon and would recommend them to anyone.",
    image: ChrisPizzi,
    userName: "Chris Pizzi",
  },
  {
    text: "I’m usually not big on doing reviews however after my experience with this carpet cleaning company I was really left with no choice but to leave one so here it goes, I stay in a 3 bedroom apartment with 5 kids 3 under the age of 5 and so my carpets have endured extreme damage from food , juice and marker and due to prior obligations I was unable to stay home while they went to work on my floors and my oldest child was home but sleeping so I had no choice but to wait until they were gone and finished with the task at hand lol but anyway I eventually got home and was literally blown away because pretty much every stain had been lifted and I forgot to mention that I also have a area rug that I been contemplating throwing away for the past 6 months because it was so dirty I thought why not pay the $220 to buy a new one because it was no point in keeping a dingy one weeeelll I’m glad I didn’t because it looks pretty darn new to me now but wait there’s more ……I had dishes in my sink that I didn’t get the chance to clean up before leaving this morning and would you freaking believe it if I told you my dishes and sink had been wiped clean and neatly stacked to dry!!! Now I’m not saying this service will be included for anyone else because who knows buuutttt what I know is my experience and I don’t want anyone else moving forward I found my guys and I’m sticking to them :)",
    image: BlankaDominguez,
    userName: "Blanka Dominguez",
  },
  {
    text: "The team did a phenomenal job deep cleaning my apartment. I couldn’t be happier with the service provided!",
    image: JillianChamberlain,
    userName: "Jillian Chamberlain",
  },
]

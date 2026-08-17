import espressoImg from '../assets/menu/coffee_espresso.png';
import cappuccinoImg from '../assets/menu/coffee_cappuccino.png';
import latteImg from '../assets/menu/coffee_latte.png';
import mochaImg from '../assets/menu/coffee_mocha.png';
import caramelImg from '../assets/menu/coffee_caramel.png';
import signatureImg from '../assets/menu/coffee_signature.png';

export const menuItems = [
  {
    id: "01",
    category: "CLASSIC COFFEE",
    name: "Classic Espresso",
    price: "₹90",
    desc: "Bold, rich and perfectly balanced.",
    image: espressoImg,
    bg: "#1a120c"
  },
  {
    id: "02",
    category: "CLASSIC COFFEE",
    name: "Cappuccino",
    price: "₹140",
    desc: "Velvety espresso finished with silky milk foam.",
    image: cappuccinoImg,
    bg: "#1f140d"
  },
  {
    id: "03",
    category: "SIGNATURE COFFEE",
    name: "Signature Latte",
    price: "₹150",
    desc: "Smooth espresso blended with creamy steamed milk.",
    image: latteImg,
    bg: "#241812"
  },
  {
    id: "04",
    category: "INDULGENT",
    name: "Chocolate Mocha",
    price: "₹170",
    desc: "Rich espresso combined with indulgent chocolate.",
    image: mochaImg,
    bg: "#160f0a"
  },
  {
    id: "05",
    category: "INDULGENT",
    name: "Caramel Latte",
    price: "₹180",
    desc: "Silky latte with a delicate caramel sweetness.",
    image: caramelImg,
    bg: "#24180e"
  },
  {
    id: "06",
    category: "TN47 EXCLUSIVE",
    name: "TN47 Signature",
    price: "₹200",
    desc: "Our signature handcrafted coffee, created specially for TN47 Coffee.",
    image: signatureImg,
    bg: "#140e0b"
  }
];

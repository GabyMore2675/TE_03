export const products = [
  // ================= Laptops =================
  {
    id: 1,
    name: "HP Pavilion 15",
    price: 2800,
    category: "laptops",
    img: "https://th.bing.com/th/id/OIP.YdFkbpLodqCiWJZtSjtffwHaEK?w=302&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    stock: 1000,
    brand: "HP",
    offerPrice: 2499,
    discount: 10,
    img2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtYEAiSgWCZiICOhTm4thfzkhabmPsuYtk0g&s",
    desc: "Laptop potente para estudio y trabajo profesional.",
    specs: [
      "Intel Core i7",
      "16GB RAM",
      "512GB SSD",
      "Pantalla 15.6” Full HD",
      "Batería de larga duración"
    ]
  },
  {
    id: 2,
    name: "ASUS TUF Gaming F15",
    price: 3500,
    category: "laptops",
    img: "https://th.bing.com/th/id/R.e807e91662c2b307f78f5976a4715cd5?rik=vJkMBOG0AOjHkA&pid=ImgRaw&r=0",
    stock: 1000,
    brand: "ASUS",
    offerPrice: 2975,
    discount: 15,
    img2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbQktP6vOkpI0SkDRHfhMg4fEN8IKf1S6o4g&s",
    desc: "Equipo de alto rendimiento ideal para gaming y tareas exigentes.",
    specs: [
      "Intel Core i7",
      "16GB RAM",
      "RTX 3050",
      "SSD 512GB",
      "Pantalla 144Hz"
    ]
  },
  {
    id: 3,
    name: "Lenovo ThinkPad X1",
    price: 4200,
    category: "laptops",
    img: "https://cdn.arstechnica.net/wp-content/uploads/2022/08/IMG_0331.jpeg",
    stock: 1000,
    brand: "Lenovo",
    offerPrice: 3990,
    discount: 5,
    img2: "https://oechsle.vteximg.com.br/arquivos/ids/16074227-1000-1000/image-801698fd55fb4d68a389c069e8306594.jpg?v=638286221905300000",
    desc: "Laptop empresarial resistente, segura y confiable.",
    specs: [
      "Intel Core i7",
      "16GB RAM",
      "SSD 1TB",
      "Pantalla 14” Full HD",
      "Certificación militar"
    ]
  },
  {
    id: 4,
    name: "Dell Inspiron 14",
    price: 3000,
    category: "laptops",
    img: "https://cdn.mos.cms.futurecdn.net/i7LkmQxJFnjqhWypfyX2Bd.jpg",
    stock: 1000,
    brand: "Dell",
    offerPrice: 2700,
    discount: 10,
    img2: "https://itti.com.np/_next/image?url=https%3A%2F%2Fadmin.itti.com.np%2Fstorage%2Fproduct%2Fdell-vostro-5490-price-nepal%2F12e7250a-d4f2-42ce-9eb0-c33f7a82f846.jpeg&w=3840&q=75",
    desc: "Perfecta para uso diario con gran rendimiento.",
    specs: [
      "Intel Core i5",
      "8GB RAM",
      "SSD 512GB",
      "Pantalla 14”",
      "Ligera y portátil"
    ]
  },
  {
    id: 5,
    name: "MacBook Air M2",
    price: 5000,
    category: "laptops",
    img: "https://cdn.mos.cms.futurecdn.net/ftDV5jz4RD7WdUeaVuRadb.jpg",
    stock: 1000,
    brand: "Apple",
    offerPrice: 4250,
    discount: 15,
    img2: "https://pe.tiendasishop.com/cdn/shop/files/hcsccrmam2_1_1.webp?v=1755618083&width=823",
    desc: "Diseño premium con potencia y eficiencia del chip M2.",
    specs: [
      "Chip Apple M2",
      "8GB RAM",
      "256GB SSD",
      "Pantalla Retina",
      "Ultra delgada"
    ]
  },

  // ================= Smartphones =================
  {
    id: 6,
    name: "iPhone 13",
    price: 4000,
    category: "smartphones",
    img: "https://tse1.mm.bing.net/th/id/OIP.kuWmVV4v-RDSUa_gr0KfGAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    stock: 1000,
    brand: "Apple",
    offerPrice: 3800,
    discount: 5,
    img2: "https://www.peru-smart.com/wp-content/uploads/2023/08/CELU370AZUL-128GB.jpg",
    desc: "Smartphone premium con alto rendimiento.",
    specs: [
      "Chip A15 Bionic",
      "128GB",
      "Cámara 12MP",
      "Pantalla OLED",
      "Face ID"
    ]
  },
  {
    id: 7,
    name: "Samsung Galaxy S23",
    price: 3500,
    category: "smartphones",
    img: "https://tse3.mm.bing.net/th/id/OIP.tO5mb0-9Im_NDLM0gtEHMQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    stock: 1000,
    offerPrice: 3150,
    discount: 10,
    img2: "https://www.peru-smart.com/wp-content/uploads/2025/01/CELR089LAVENDER-128GB.jpg",
    brand: "Samsung",
    desc: "Potente, elegante y con excelente cámara.",
    specs: [
      "Snapdragon 8 Gen 2",
      "8GB RAM",
      "Pantalla AMOLED 120Hz",
      "Cámara 50MP",
      "5G"
    ]
  },
  {
    id: 8,
    name: "Xiaomi 13",
    price: 2800,
    category: "smartphones",
    img: "https://images.fonearena.com/blog/wp-content/uploads/2022/11/Xiaomi-13-1024x609.jpg",
    stock: 1000,
    brand: "Xiaomi",
    offerPrice: 2023,
    discount: 15,
    img2: "https://www.peru-smart.com/wp-content/uploads/2024/07/CELU738AZUL-256GB.jpg",
    desc: "Excelente relación calidad-precio.",
    specs: [
      "Snapdragon 8 Gen 2",
      "12GB RAM",
      "256GB",
      "Pantalla AMOLED",
      "Carga rápida"
    ]
  },
  {
    id: 9,
    name: "Motorola Edge 40",
    price: 2500,
    category: "smartphones",
    img: "https://tse4.mm.bing.net/th/id/OIP.C0IE4K4DBDo_Fa_02B-3mgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    stock: 1000,
    brand: "Motorola",
    offerPrice: 2375,
    discount: 5,
    img2: "https://www.peru-smart.com/wp-content/uploads/2024/04/CELU720MAGENTA-256GB_0.jpg",
    desc: "Diseño premium con gran rendimiento.",
    specs: [
      "MediaTek Dimensity",
      "8GB RAM",
      "Pantalla OLED",
      "Cámara 50MP",
      "5G"
    ]
  },
  {
    id: 10,
    name: "Realme GT",
    price: 2200,
    category: "smartphones",
    img: "https://www.gizmochina.com/wp-content/uploads/2021/02/Realme-GT-5G-rear-.jpg",
    stock: 1000,
    brand: "Realme",
    offerPrice: 1980,
    discount: 10,
    img2: "https://www.peru-smart.com/wp-content/uploads/2023/08/CELU631AZUL-256GB.jpg",
    desc: "Potencia y velocidad a bajo costo.",
    specs: [
      "Snapdragon 888",
      "8GB RAM",
      "128GB",
      "Pantalla 120Hz",
      "Carga rápida"
    ]
  },

  // ================= Accesorios =================
  {
    id: 11,
    name: "Mouse Gamer RGB",
    price: 150,
    category: "accesorios",
    img: "https://tse1.mm.bing.net/th/id/OIP.NE9dR66WT_JBddweJ9FUmQHaEJ?rs=1&pid=ImgDetMain&o=7&rm=3",
    stock: 1000,
    brand: "Generic",
    offerPrice: 127.5,
    discount: 15,
    img2: "https://mmstoreperu.com/cdn/shop/files/MOUSEHAVITMS1001S_4_800DPI_RGB_NEGRO_1000x.png?v=1711471340",
    desc: "Precisión y estilo para gaming.",
    specs: [
      "Sensor óptico",
      "RGB",
      "Alta precisión",
      "Ergonómico",
      "USB"
    ]
  },
  {
    id: 12,
    name: "Teclado Mecánico RGB",
    price: 300,
    category: "accesorios",
    img: "https://tse2.mm.bing.net/th/id/OIP.kvnp2KCy9YCTpGeZhQEXBwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    stock: 1000,
    brand: "Redragon",
    offerPrice: 285,
    discount: 5,
    img2: "https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/4389/PMP20001278158/full_image-1.jpeg",
    desc: "Respuesta rápida y diseño profesional.",
    specs: [
      "Switch mecánico",
      "RGB",
      "Anti-ghosting",
      "USB",
      "Alta durabilidad"
    ]
  },
  {
    id: 13,
    name: "Audífonos Bluetooth",
    price: 200,
    category: "accesorios",
    img: "https://tse1.explicit.bing.net/th/id/OIP.yQT5Vw3f-fOhKybzcW7CDwHaFW?w=600&h=433&rs=1&pid=ImgDetMain&o=7&rm=3",
    stock: 1000,
    brand: "Sony",
    offerPrice: 190,
    discount: 5,
    img2: "https://media.falabella.com/falabellaPE/122776255_01/w=1500,h=1500,fit=cover",
    desc: "Sonido envolvente y comodidad.",
    specs: [
      "Bluetooth 5.0",
      "Cancelación de ruido",
      "Batería larga",
      "Micrófono integrado",
      "Alta fidelidad"
    ]
  },
  {
    id: 14,
    name: "Webcam HD",
    price: 180,
    category: "accesorios",
    img: "https://tse1.mm.bing.net/th/id/OIP.VuXjNhqHU1tFbpb9HqZAfQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    stock: 1000,
    brand: "Logitech",
    offerPrice: 144,
    discount: 20,
    img2: "https://todotec.com.pe/cdn/shop/products/camara-1-usb.png?v=1667501863",
    desc: "Ideal para videollamadas y streaming.",
    specs: [
      "Resolución HD",
      "Micrófono integrado",
      "Plug & Play",
      "Compatible Zoom/Meet",
      "Auto enfoque"
    ]
  },
  {
    id: 15,
    name: "USB 128GB",
    price: 90,
    category: "accesorios",
    img: "https://th.bing.com/th/id/R.c71d6a4e40e2ec8b1143916a38112709?rik=w%2bDMBkhGsYRyTg&riu=http%3a%2f%2fwww.laboratoriosjulio.mx%2fcdn%2fshop%2ffiles%2fventiapp-image--eb562eeb-ab84-45de-9be8-a075bfce4a33_3_4_2023_11_38_40_422.jpg%3fv%3d1696621273&ehk=izFvId21aU%2fEE2%2fdAWvhyUNC9CaYYnB0QuEriYq59Ns%3d&risl=&pid=ImgRaw&r=0",
    stock: 1000,
    brand: "Kingston",
    offerPrice: 81,
    discount: 10,
    img2: "https://media.falabella.com/falabellaPE/16483137_1/w=1500,h=1500,fit=cover",
    desc: "Alta velocidad y almacenamiento confiable.",
    specs: [
      "128GB",
      "USB 3.0",
      "Alta velocidad",
      "Compacto",
      "Duradero"
    ]
  }
];

export default products;
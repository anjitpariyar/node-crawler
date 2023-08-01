import connectDb from "./db/Dbconnect";
import { ICategory } from "./model/Category.modal";
import CategoryAdd from "./controller/Category";

const getStarted = async () => {
  connectDb().then(async (res) => {
    try {
      let data: ICategory[] = [
        {
          icon: "classname",
          name: "Hiking Tours",
          backgroundImage:
            "https://images.unsplash.com/photo-1615278166719-c411455d594d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fEhpa2luZyUyMFRvdXJzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          about:
            "Nepal is a hiker's paradise, offering a variety of stunning trekking routes that showcase the country's natural beauty and unique culture. One of the most popular treks is the Everest Base Camp Trek, which takes you to the foot of the world's tallest mountain and offers breathtaking views of the Himalayas. Another popular trek is the Annapurna Circuit Trek, which winds through the Annapurna mountain range and takes you through traditional Nepalese villages and lush forests.",
          destination: [""],
        },
        {
          icon: "classname",
          name: "Hiratage",
          backgroundImage:
            "https://images.unsplash.com/photo-1529733905113-027ed85d7e33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bmVwYWwlMjBIaXJhdGFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          about:
            "Nepal is a country rich in cultural and historical heritage, with many sites recognized by UNESCO as World Heritage Sites. These include the Kathmandu Valley with its seven Monument Zones, the Chitwan National Park, Lumbini, birthplace of the Buddha, and the Sagarmatha National Park, home to Mount Everest. Other notable sites include the Pashupatinath Temple, Swayambhunath Stupa, Bhaktapur Durbar Square, Patan Durbar Square, and Boudhanath Stupa. These sites are renowned for their exquisite architecture, intricate carvings, and beautiful artwork, and attract visitors from all over the world who come to experience Nepal's rich cultural heritage.",
          destination: [""],
        },
        {
          icon: "classname",
          name: "Nature and Wildlife",
          backgroundImage:
            "https://images.unsplash.com/photo-1622599357169-7fb71842c008?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fE5hdHVyZSUyMGFuZCUyMFdpbGRsaWZlJTIwbmVwYWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
          about:
            "Nepal is a hiker's paradise, offering a variety of stunning trekking routes that showcase the country's natural beauty and unique culture. One of the most popular treks is the Everest Base Camp Trek, which takes you to the foot of the world's tallest mountain and offers breathtaking views of the Himalayas. Another popular trek is the Annapurna Circuit Trek, which winds through the Annapurna mountain range and takes you through traditional Nepalese villages and lush forests.",
          destination: [""],
        },
        {
          icon: "classname",
          name: "Cultural Tours",
          backgroundImage:
            "https://images.unsplash.com/photo-1507743617593-0a422c9bb7f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fEN1bHR1cmFsJTIwVG91cnMlMjBuZXBhbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          about:
            "Nepal is a country with rich cultural diversity and heritage. A cultural tour in Nepal allows visitors to explore the unique traditions and customs of Nepalese people. One can visit the ancient temples and monasteries, participate in cultural festivals, and experience the lifestyle of locals. Some popular cultural destinations in Nepal include the Kathmandu Valley, Bhaktapur Durbar Square, Patan Durbar Square, and the birthplace of Lord Buddha in Lumbini. Visitors can witness the intricate wood carvings, stone sculptures, and religious artifacts that are a testament to Nepal's rich cultural history. A cultural tour in Nepal is an unforgettable experience that provides a glimpse into the country's vibrant heritage.",
          destination: [""],
        },
      ];

      let resp: any = await CategoryAdd(data);
      console.log("response", resp);
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

getStarted();

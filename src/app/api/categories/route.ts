import { connectDB } from "@/utils/features";
import { NextResponse } from "next/server";

import { Category } from "@/models/category";

export const GET = async () => {
  connectDB();

  try {
    const categories = await Category.find();
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
      }
    );
  }
};

// const productsToInsert = [
//     {
//         slug: "pastas",
//         title: "Italian Pastas",
//         desc: "Savor the taste of perfection with our exquisite Italian handmade pasta menu.",
//         img: "/temporary/m1.png",
//         color: "white",
//       },
//       {
//         slug: "burgers",
//         title: "Juicy Burgers",
//         desc: "Burger Bliss: Juicy patties, bold flavors, and gourmet toppings galore.",
//         img: "/temporary/m2.png",
//         color: "black",
//       },
//       {
//         slug: "pizzas",
//         title: "Cheesy Pizzas",
//         desc: "Pizza Paradise: Irresistible slices, mouthwatering toppings, and cheesy perfection.",
//         img: "/temporary/m3.png",
//         color: "white",
//       }
//   ];

  // try {
  //   const insertedProducts = await Category.insertMany(productsToInsert);
  //   console.log('Inserted products:', insertedProducts);
  // } catch (error) {
  //   console.error('Error inserting products:', error);
  // }

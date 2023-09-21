import { connectDB } from "@/utils/features";
import { NextRequest, NextResponse } from "next/server";

import { Product } from "@/models/product";

export const GET = async (req: NextRequest) => {
  connectDB();

  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");
  try {
    const query = cat ? { catSlug: cat } : { isFeatured: true };

    const products = await Product.find({
      $or: [{ catSlug: query.catSlug }, { isFeatured: query.isFeatured }],
    });
    return new NextResponse(JSON.stringify(products), { status: 200 });
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

// const Products = [
//     {
//         isFeatured : true,
//         catSlug : "pizzas",
//         title: "Sicilian",
//         desc: "Ignite your taste buds with a fiery combination of spicy pepperoni, jalapeños, crushed red pepper flakes, and melted mozzarella cheese, delivering a kick with every bite.",
//         img: "/temporary/p1.png",
//         price: 24.9,
//         options: [
//           {
//             title: "Small",
//             additionalPrice: 0,
//           },
//           {
//             title: "Medium",
//             additionalPrice: 4,
//           },
//           {
//             title: "Large",
//             additionalPrice: 6,
//           },
//         ],
//       },
//       {
//         isFeatured : true,
//         catSlug : "burgers",
//         title: "Hawaiian Teriyaki",
//         desc: "Experience a taste of the tropics with a juicy beef patty glazed in tangy teriyaki sauce, topped with grilled pineapple, crispy bacon, and fresh lettuce, and all the classic fixings on a toasted bun.",
//         img: "/temporary/p9.png",
//         price: 29.9,
//         options: [
//           {
//             title: "Small",
//             additionalPrice: 0,
//           },
//           {
//             title: "Medium",
//             additionalPrice: 4,
//           },
//           {
//             title: "Large",
//             additionalPrice: 6,
//           },
//         ],
//       },
//   ]
//   try {
//     const insertedProducts = await Product.insertMany(Products);
//     console.log("Inserted products:", insertedProducts);
//   } catch (error) {
//     console.error("Error inserting products:", error);
//   }

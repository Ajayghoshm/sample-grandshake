// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { connectToDatabase } = require("../../mongo");
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getSkill(req, res);
    }

    case "POST": {
      return addSkill(req, res);
    }

    case "PUT": {
      return updateSkill(req, res);
    }

    case "DELETE": {
      return deleteSkill(req, res);
    }
  }
}

// Getting all posts.
async function getSkill(req, res) {
  try {
    let { db } = await connectToDatabase();
    let id = req.query.id;
    console.debug("req", id);
    let SkillCollection = await db.collection("Skill_list");
    let SkillList;
    if (id) {
      SkillList = await SkillCollection.find({ id: id }).toArray();
    } else {
      SkillList = await SkillCollection.find({}).toArray();
    }
    SkillList = JSON.parse(JSON.stringify(SkillList));
    return res.json(SkillList);
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// Adding a new post
async function addSkill(req, res) {
  try {
    let { db } = await connectToDatabase();
    await db.collection("Skill_list").insertOne(JSON.parse(req.body));
    return res.json({
      message: "Post added successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// Updating a post
async function updateSkill(req, res) {
  try {
    let { db } = await connectToDatabase();
    const { title, desc, id } = JSON.parse(req.body);
    console.debug("here", req.body, title);

    await db.collection("Skill_list").updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          title: title,
          desc: desc,
        },
      },
    );

    return res.json({
      message: "Skill updated successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// deleting a post
async function deleteSkill(req, res) {
  try {
    let { db } = await connectToDatabase();

    const { id } = JSON.parse(req.body);
    console.log("delete", id);
    await db.collection("Skill_list").deleteOne({
      _id: new ObjectId(id),
    });

    return res.json({
      message: "Skill deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// import clientPromise from " ./mongo";
// import { ObjectId } from "mongodb";

// export default async function handler(req, res) {
//   // switch the methods
//   switch (req.method) {
//       case 'GET': {
//           return getPosts(req, res);
//       }

//       case 'POST': {
//           return addPost(req, res);
//       }

//       case 'PUT': {
//           return updatePost(req, res);
//       }

//       case 'DELETE': {
//           return deletePost(req, res);
//       }
//   }
// }

// export const editSkill = async (req, res) => {
//   try {
//     const client = await clientPromise;
//     const db = client.db("globeia");
//     const { id } = req.query;
//     const { title, content } = req.body;

//     const post = await db.collection("Skill_list").updateOne(
//       {
//         _id: ObjectId(id),
//       },
//       {
//         $set: {
//           title: title,
//           desc: desc,
//         },
//       },
//     );

//     res.json(post);
//   } catch (e) {
//     console.error(e);
//     throw new Error(e).message;
//   }
// };
// // handler.get(async (req, res) => {
// //     const { date } = req.query;

// //     const dataModel = { "_id": new ObjectID(), "date": date, "calories": { "label": "Calories", "total": 0, "target": 0, "variant": 0 }, "carbs": { "label": "Carbs", "total": 0, "target": 0, "variant": 0 }, "fat": { "label" : "Fat", "total": 0, "target": 0, "variant": 0 }, "protein": { "label" : "Protein", "total": 0, "target": 0, "variant": 0 }}

// //     let doc = {}

// //     if(date){
// //         doc = await req.db.collection('daily').findOne({date: new Date(date)})
// //     } else {
// //         doc = await req.db.collection('daily').findOne()
// //     }
// //     if(doc == null){
// //         doc = dataModel
// //     }
// //     res.json(doc)
// // });

// handler.post(async (req, res) => {
//     let data = req.body
//     data = JSON.parse(data);
//     data.date = new Date(data.date);
//     let doc = await req.db.collection('daily').updateOne({date: new Date(data.date)}, {$set:data}, {upsert: true})

//     res.json({message: 'ok'});
// })

// export default (req, res) => handler.apply(req, res)

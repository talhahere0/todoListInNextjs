import dbConnect from "../../../utils/connection/mongodbConnection";
import AddList from "../../../models/AddList";

const handler = async (req, res) => {
  await dbConnect();
  const tasks = await AddList.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    tasks,
  });
};
export default handler;

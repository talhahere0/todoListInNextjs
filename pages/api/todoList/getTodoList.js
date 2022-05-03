import dbConnect from "../../../utils/connection/mongodbConnection";
import AddList from "../../../models/AddList";

const handler = async (req, res) => {
  await dbConnect();
  const get_task = await AddList.find();

  res.status(200).json({
    status: "success",
    get_task,
  });
};
export default handler;

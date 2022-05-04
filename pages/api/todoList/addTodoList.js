import dbConnect from "../../../utils/connection/mongodbConnection";
import AddList from "../../../models/AddList";

const handler = async (req, res) => {
  await dbConnect();
  const new_task = await AddList.create({
    task: req.body.task,
  });

  res.status(200).json({
    status: "success",
    new_task,
  });
};
export default handler;

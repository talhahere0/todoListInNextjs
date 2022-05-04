import dbConnect from "../../../utils/connection/mongodbConnection";
import AddList from "../../../models/AddList";

const handler = async (req, res) => {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();
  if (method === "DELETE") {
    try {
      await AddList.findByIdAndDelete(id);
      res.status(200).json({ message: "Task Deleted Successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
};
export default handler;

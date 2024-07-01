const Url = require("../../models/urlModel");

exports.shortenUrl = async (req, res) => {
  try {
    var { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "Url is required" });
    }

    if (!isUrlValid(url)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    if(url.endsWith("/")) url = url.slice(0, -1);
      

    const existingUrl = await Url.findOne({ url });
    if (existingUrl) {
      return res
        .status(200)
        .json({ message: "Shortened URL already exists", shortUrl: existingUrl.shortUrl });
    }

  const id = generateShortUrlId();
    const shortUrl = new Url({
      id,
      url,
      shortUrl: `${req.protocol}://${req.get("host")}/${id}`,
    });

    await shortUrl.save();

    return res
      .status(200)
      .json({ message: "Shortened URL created", shortUrl: shortUrl.shortUrl });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const url = await Url.findOne({ id });
    if (!url) {
      return res.status(404).json({ error: "Url not found" });
    }
    return res.redirect(url.url);
  }
  catch (err) {
    res.status(400).json({ error: err.message });
  }
}

  function isUrlValid(userInput) {
    if (userInput.includes("localhost")) return false;
  try {
    new URL(userInput);
    return true;
  }
  catch (err) {
    return false;
  }
}

function generateShortUrlId() {
  return Math.random().toString(36).substring(2, 8);
}

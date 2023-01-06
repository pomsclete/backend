const Sauces = require("../models/Sauces");

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  console.log(req.body.sauce);
  const sauce = new Sauces({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    userLiked: [],
    userDisLiked: [],
  });
  sauce
    .save()
    .then(() => {
      res.status(200).json({ message: "Objet enregistré" });
    })
    .catch((error) => {
      res.status(400).json({ error });
      console.log(error);
    });
};

exports.getOneSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.delete = (req, res, next) => {
  Sauces.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé" }))
    .catch((error) => res.status(404).json({ error }));
};

exports.modify = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Sauces.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié" }))
    .catch((error) => res.status(401).json({ error }));
};

exports.getSauce = (req, res, next) => {
  Sauces.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

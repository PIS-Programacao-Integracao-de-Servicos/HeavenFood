// Função para obter informações da página "About Us"
const getAboutUs = (req, res) => {
    const aboutInfo = {
      title: "About Us",
      description: "Welcome to Food Heaven! We are dedicated to providing the best recipes and culinary experiences. Our team works tirelessly to bring you a variety of delicious and healthy recipes from around the world.",
      mission: "To inspire cooking at home by making recipes easy, accessible, and fun for everyone.",
      vision: "To be the world's most trusted recipe platform.",
      values: ["Innovation", "Integrity", "Sustainability", "Community"],
    };
  
    res.status(200).json(aboutInfo);
  };
  
  module.exports = { getAboutUs };
  
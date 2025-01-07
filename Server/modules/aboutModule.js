// Função para obter informações da página "About Us"
const getAboutUs = (req, res) => {
    const aboutInfo = {
      title: "About Us",
      description: "Bem-vindo ao Food Heaven! Nós nos dedicamos a fornecer as melhores receitas e experiências culinárias. Nossa equipe trabalha incansavelmente para trazer a você uma variedade de receitas deliciosas e saudáveis ​​do mundo todo.",
      mission: "Para inspirar a culinária em casa, tornando receitas fáceis, acessíveis e divertidas para todos.",
      vision: "Ser a plataforma de receitas mais confiável do mundo.",
      values: ["Inovação", "Integridade", "Sustentabilidade", "Comunidade"],
    };
  
    res.status(200).json(aboutInfo);
  };
  
  module.exports = { getAboutUs };
  
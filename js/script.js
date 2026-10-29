
const camera = document.getElementById("camera");

async function iniciarCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user"
      },
      audio: false
    });

    camera.srcObject = stream;
    
await camera.play();

document.getElementById("aviso-camera").textContent =
  "Seu Jardim Encantado está pronto! 🌸";


  } catch (erro) {
    console.error("Erro ao abrir a câmera:", erro);
    alert("Não foi possível abrir a câmera. Verifique a permissão.");
  }
}

iniciarCamera();

const botaoFoto = document.getElementById("tirarFoto");

botaoFoto.addEventListener("click", async () => {
  const video = document.getElementById("camera");
  const moldura = document.querySelector(".moldura");

  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;

  const ctx = canvas.getContext("2d");

 
const cameraPronta =
  video.srcObject && video.readyState >= 2;

if (!cameraPronta) {
  alert("A câmera ainda não está pronta. Tente novamente! 🌸");
  return;
}

const imagem = video;


  // Desenha a foto preenchendo o formato Stories

const largura = video.videoWidth;
const altura = video.videoHeight;


  const escala = Math.max(
    canvas.width / largura,
    canvas.height / altura
  );

  const w = largura * escala;
  const h = altura * escala;

  ctx.drawImage(
    imagem,
    (canvas.width - w) / 2,
    (canvas.height - h) / 2,
    w,
    h
  );

  // Coloca as flores por cima
  ctx.drawImage(moldura, 0, 0, canvas.width, canvas.height);

  // Desenha a assinatura da Alice na foto
  await document.fonts.load('32px "Great Vibes"');

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = "#7d294f";
  ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
  ctx.lineWidth = 5;
  ctx.lineJoin = "round";

  ctx.font = '76px "Great Vibes"';

  const centroX = canvas.width / 2;

  ctx.strokeText(
    "1 ano no Jardim Encantado da",
    centroX,
    1370
  );

  ctx.fillText(
    "1 ano no Jardim Encantado da",
    centroX,
    1370
  );

  // Desenha o A ornamental
  const letraA = new Image();
  letraA.src = "img/letra-a.png";
  await letraA.decode();

  ctx.drawImage(letraA, 415, 1400, 150, 150);

  // Desenha o restante do nome
  ctx.font = '110px "Great Vibes"';
  ctx.strokeText("lice", 600, 1490);
  ctx.fillText("lice", 600, 1490);

  // Salva a imagem
  const link = document.createElement("a");
  link.download = "jardim-encantado-alice.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

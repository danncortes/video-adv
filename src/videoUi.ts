export const videoUi = (url) => (
  `<section>
    <figure class="icon muted"></figure>
    <video id="video" loop muted>
      <source src="${url}" type = "video/mp4">
    </video>
    <div class="progressBar"></div>
  </section>`
)
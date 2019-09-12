---
layout: default

body_class: homepage
---

<a href="#logo" id="logo" class="homepage-logo">
  <img src="/svgs/logo.svg" alt=""/>
</a>

<div class="viewport">
  <p class="font-size-lead">
    Hi, my name is Jean Wojciechowski, I’m a Brazilian graphic designer with special interest in
    branding and type design.
    You can check my work below. I’m also on
    <a href="{{ site.links.behance }}">Behance</a>,
    <a href="{{ site.links.instagram }}">Instagram</a>,
    <a href="{{ site.links.tumblr }}">Tumblr</a>
    and
    <a href="{{ site.links.arena }}">Arena</a>.
  </p>

  <p class="font-size-lead">
    Feel free to reach out:<br /><a href="mailto:woj.jean@gmail.com">woj.jean@gmail.com</a>
  </p>
</div>

<!-- TODO: fix bg color being red when page loads at a random scroll position  -->

<div class="project-thumb d-flex">
  <div class="w-100 align-self-center">
    <a class="project-thumbnail" href="#something">
      <img src="/images/curitiba.jpg" alt="" />
      <header>
        <h1>Curitiba Coral</h1>
        <div class="d-flex text-uppercase">
          <div class="w-50">
            <h6>Creative Field</h6>
          </div>
          <div class="w-50">
            <p>Branding</p>
            <p>Visual branding for Christian Choir</p>
          </div>
        </div>
        <p class="text-uppercase">See full project</p>
      </header>
    </a>
  </div>
</div>

<article>
  <div>
    {%
      include
      font-editor.html
      target="font-editor-linsingen"
      families="Linsingen Moderna, Linsingen Stencil, Linsingen Vintage"
    %}
    <div
      class="font-editor-preview"
      id="font-editor-linsingen"
      contenteditable
      style="font-size: 100px; font-weight: normal; font-family: 'Linsingen Moderna';"
    >
      LINSINGEN<br/>TYPEFACE
    </div>
  </div>
  <footer>
    <p class="text-uppercase"><a href="/linsingen">See full project</a></p>
  </footer>
</article>

<div class="project-thumb d-flex">
  <div class="w-100">
    <a class="project-thumbnail project-thumbnail-alt d-flex" href="#something">
      <img src="/images/royal-rage-band.jpg" alt="" />
      <header>
        <h1>Royal Rage Band</h1>
        <div class="d-flex text-uppercase">
          <div class="w-50">
            <h6>Creative Field</h6>
          </div>
          <div class="w-50">
            <p>Poster Design</p>
            <p>Tour Posters for Thrash Metal Band Royal Rage</p>
          </div>
        </div>
        <p class="text-uppercase">See full project</p>
      </header>
    </a>
  </div>
</div>

<article>
  <div>
    {%
      include
      font-editor.html
      target="font-editor-massimo"
      families="Massimo Text, Massimo Display"
      weights="Regular, Light, Semi, Bold"
    %}
    <div
      class="font-editor-preview"
      id="font-editor-massimo"
      contenteditable
      style="font-size: 100px; font-weight: normal; font-family: 'Massimo Text';"
    >
      MASSIMO<br/>TYPEFACE
    </div>
  </div>
  <footer>
    <p class="text-uppercase"><a href="/massimo">See full project</a></p>
  </footer>
</article>

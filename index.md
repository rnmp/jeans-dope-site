---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---

<p class="font-size-lead">
  Hi, my name is Jean Wojciechowski, I’m a Brazilian graphic designer with special interest in
  branding and type design.
  You can check my work below. I’m also on Behance, Instagram, Tumblr and Arena.
</p>

<p class="font-size-lead">
  Feel free to reach out: woj.jean@gmail.com
</p>

<div class="font-editor-controls">
  <label for="font-editor-1-alignment-left">
    <input
      type="radio"
      id="font-editor-1-alignment-left"
      name="font-editor-1-alignment"
      class="font-editor-alignment"
      value="left"
      data-target="font-editor-1"
      checked
    />
    Left
  </label>
  <label for="font-editor-1-alignment-center">
    <input
      type="radio"
      id="font-editor-1-alignment-center"
      name="font-editor-1-alignment"
      class="font-editor-alignment"
      value="center"
      data-target="font-editor-1"
    />
    Center
  </label>
  <label for="font-editor-1-alignment-right">
    <input
      type="radio"
      id="font-editor-1-alignment-right"
      name="font-editor-1-alignment"
      class="font-editor-alignment"
      value="right"
      data-target="font-editor-1"
    />
    Right
  </label>
</div>

<input class="font-editor-size" type="range" min="10" max="100" increment="1" data-target="font-editor-1" value="50" />

<div id="font-editor-1" contenteditable style="font-size: 50px">
  Where are the fonts, motherfucker?
</div>

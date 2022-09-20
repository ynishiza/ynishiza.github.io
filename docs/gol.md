---
layout: page
---

# GOL

Game of life: a programming challenge that the hiring team was using at my former workplace in 2015.
Tried it for fun back then.

<!-- 2015 Yui Nishizawa -->
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"></script>
  <script src="https://code.jquery.com/jquery-1.11.0.min.js"></script>
  <link href="data/gol/style.css" rel="stylesheet">
</head>
<body>
  <header>
    <label>Interval (ms): <input name="update_interval" type="number" value="1000" min="1"></label>
    <button name="start_stop">Stop</button>
    <button name="save">Save</button>
    <button name="load">Load</button>
    <button name="clear">Clear</button>
    <div>
      <label>Probability (live): <input name="random_prob" step="0.01" type="number" value="0.08" max="1" min="0"></label>
      <button name="random_generate">Generate</button>
    </div>
    <div>
      <label>Epoc:<span name="info_epoc"></span></label>
      <label>Percentage alive:<span name="info_percent"></span></label>
      <label>Total living:<span name="info_live"></span></label>
      <label>Total dead:<span name="info_dead"></span></label>
      <label>New born:<span name="info_newborn"></span></label>
      <label>New dead:<span name="info_newdead"></span></label>
      <label>Survive:<span name="info_survive"></span></label>
      <label>Average neighbor count:<span name="info_neighborcount"></span></label>
    </div>
    <div id="main"></div>
  </header>
</body>
<script src="data/gol/script.js"></script>

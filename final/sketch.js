let particles = [];
let totalParticles = 100;
let img;

function preload() {
  img = loadImage('123.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
  background(0);

  // Initialize each particle with its properties
  for (let i = 0; i < totalParticles; i++) {
    particles[i] = {
      prevPosition: { x: width/2, y: height/2},
      position: { x: width/2, y: height/2},
      //randomly determine whether the particle should move in a positive or negative
      //this direction I ask chatGPT to help
      direction: random() > 0.5 ? 1 : -1,
      radius: random(3, 10),
      angle: 0,
    };
  }
}

function draw() {
  // Iterate through each particle in the array
  for (let i = 0; i < totalParticles; i++) {
    let particle = particles[i];
    // Update the angle of the particle's movement
    particle.angle += (1 / particle.radius) * particle.direction;

    // Update the position based on the angle and radius
    particle.position.x += cos(particle.angle) * particle.radius;
    particle.position.y += sin(particle.angle) * particle.radius;

    // Check if the particle is outside the image or on a bright area
    //this if function I ask chatGPT to help
    if (
      brightness(img.get(round(particle.position.x), round(particle.position.y))) > 70 ||
      particle.position.x < 0 ||
      particle.position.x > width ||
      particle.position.y < 0 ||
      particle.position.y > height
    ) {
      // Reverse the direction, set a new radius, and adjust the angle
      particle.direction *= -1;
      particle.radius = random(3, 10);
      particle.angle += PI;
    }

    // Get the color at the current particle position in the image
    let c = img.get(round(particle.position.x), round(particle.position.y));

    // Draw a colored curve at the particle position
    push();
    translate(particle.position.x, particle.position.y);
    noFill();
    stroke(color(c[0], c[1], c[2]));
    strokeWeight(random(3));
    //curve(x1, y1, x2, y2, x3, y3, x4, y4)
    curve(
      particle.position.x,
      particle.position.y,
      sin(particle.position.x),
      cos(particle.position.y),
      sin(particle.position.x) * random(140),
      cos(particle.position.y) * random(100),
      0,
      0,
      cos(particle.position.y) * sin(particle.position.x) * random(200),
      cos(particle.position.x) * sin(particle.position.y) * 20
    );
    pop();

    // Update the previous position of the particle
    particle.prevPosition.x = particle.position.x;
    particle.prevPosition.y = particle.position.y;
  }
}

function keyPressed() {
  if (key == 'i') 
  saveCanvas("colorChangedFireworks.png");
}

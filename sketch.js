// By Wiskiv1 9/6/23

function setup() {
    createCanvas(800, 500);

    background(52);
    generate_flag(2, 2, width - 4, height - 4);
    
    noLoop()
}

function draw() {
}

function generate_flag(x, y, w, h) {
    let strepen = 13;
    let sterren = 50;
    let kleur = {
        rood: [179, 25, 66],
        wit: [255, 255, 255],
        blauw: [10, 49, 97]
    }

    push()
    noStroke();

    //strepen
    let even, oneven;
    if (random() < 0.5) { // begin kleur kiezen
        even = kleur.wit;
        oneven = kleur.rood;
    } else {
        even = kleur.rood;
        oneven = kleur.wit;
    }

    // strepen tekenen
    let hoogte = 0;
    let current_hoogte = 0;
    for (let i = 0; i < strepen; i++) {
        if (i%2 == 0) {
            fill(even);
        } else {
            fill(oneven);
        }

        if (i == strepen - 1) {hoogte = h - current_hoogte;} //hoogte bepalen
        else {hoogte = floor(random(floor(0.005*h), 0.3*h - strepen - 0.3*current_hoogte + i*floor(0.005*h)));}

        rect(x, y + current_hoogte, w, hoogte);

        current_hoogte += hoogte; // strepen onder elkaar tekenen ipv op elkaar
    }

    // blauwe zone
    fill(kleur.blauw);
    hoogte = floor(random(0, h));
    let breedte = floor(random(0, w));
    let posX = floor(random(x, x + w - breedte))
    let posY = floor(random(y, y + h - hoogte))
    rect(posX, posY, breedte, hoogte);

    // sterren
    fill(kleur.wit);
    for (let i = 0; i < sterren; i++) {
        let size = floor(random(0.05*hoogte, 0.15*hoogte));
        let sterX = floor(random(posX, posX + breedte));
        let sterY = floor(random(posY, posY + hoogte));

        ster(sterX, sterY, size);
    }

    pop()
}

function ster(x, y, s) {
    push();
    noStroke();
    translate(x, y); // naar midden van ster transleren
    rotate(PI); // bovenste punt wijst recht omhoog
    for (let i = 0; i < 5; i++) {
    triangle(0, 0.5*s, 0.25*s, 0, -0.25*s, 0);
    rotate(0.4*PI);
    }
    translate(-x, -y); // terugraaien en transleren
    rotate(PI);
    pop()
}
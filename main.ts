let distanceDroite = 0
let distanceDevant = 0
let distanceGauche = 0
function regarderDroite () {
    maqueen.servoRun(maqueen.Servos.S1, 20)
    basic.pause(100)
}
function checkObstacle () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
        stopRobot()
        regarderDroite()
        if (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
            tournerGauche()
            regarderDevant()
        } else {
            tournerDroite()
            regarderDevant()
        }
    } else {
        allerDroit()
    }
}
function regarderDevant () {
    maqueen.servoRun(maqueen.Servos.S1, 90)
    basic.pause(100)
}
function tournerGauche () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 35)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
}
function regarderGauche () {
    maqueen.servoRun(maqueen.Servos.S1, 170)
    basic.pause(100)
}
function tournerDroite () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 35)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 0)
}
function stopRobot () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 0)
}
function allerDroit () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 30)
}
basic.forever(function () {
    regarderDroite()
    basic.pause(100)
    distanceDroite = maqueen.Ultrasonic(PingUnit.Centimeters)
    regarderDevant()
    basic.pause(100)
    distanceDevant = maqueen.Ultrasonic(PingUnit.Centimeters)
    regarderGauche()
    basic.pause(100)
    distanceGauche = maqueen.Ultrasonic(PingUnit.Centimeters)
    if (distanceDroite <= 10) {
        tournerGauche()
    } else if (distanceDevant <= 12) {
        if (distanceDroite >= distanceGauche) {
            tournerDroite()
        } else {
            tournerGauche()
        }
    } else if (distanceGauche <= 6) {
        tournerDroite()
    } else {
        allerDroit()
    }
})

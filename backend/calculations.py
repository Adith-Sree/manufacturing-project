
import math

def cutting_speed(diameter, rpm):

    speed = (math.pi * diameter * rpm) / 1000

    return round(speed, 3)

def machining_time(speed, feed, length):

    if speed <= 0:
        return {"error": "Speed must be greater than 0"}

    if feed <= 0:
        return {"error": "Feed must be greater than 0"}

    if length <= 0:
        return {"error": "Length must be greater than 0"}

    time = length / (speed * feed)

    return {"machining_time": round(time,4)}
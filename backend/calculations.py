import math

def cnc_calculations(diameter, rpm, feed, length, doc, nose_radius):

    if rpm <= 0 or feed <= 0 or diameter <= 0:
        return {"error": "Invalid machining parameters"}

    feed_rate = feed * rpm

    if feed_rate == 0:
        return {"error": "Feed rate cannot be zero"}

    cutting_speed = (math.pi * diameter * rpm) / 1000

    machining_time = length / feed_rate

    mrr = math.pi * diameter * doc * feed * rpm

    power = (mrr * 1.5) / (60 * 1000)

    if nose_radius > 0:
        surface_roughness = (feed**2) / (32 * nose_radius)
    else:
        surface_roughness = 0

    return {

        "cutting_speed": round(cutting_speed,2),
        "feed_rate": round(feed_rate,2),
        "machining_time": round(machining_time,3),
        "mrr": round(mrr,2),
        "power": round(power,2),
        "surface_finish": round(surface_roughness,4)

    }
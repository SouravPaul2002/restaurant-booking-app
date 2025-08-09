import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar"
import { DialogClose } from '@radix-ui/react-dialog';
import { Input } from "@/components/ui/input";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from "sonner";
import axios from "axios";
function BookRestaurant({ restaurant }) {

    const [date, setDate] = useState(new Date());
    const [timeSlot, settimeSlot] = useState([]);


    const openingTime = restaurant.OpeningTime.slice(0, 5); // openingTime=10:00
    const [hours] = openingTime.split(":").map(Number); //split the hours and minutes
    //add 1 hour 
    let newHours = hours + 1;
    // if(newHours>=24){
    //     newHours -=24;
    // }
    const closingTime = restaurant.ClosingTime.slice(0, 5); // closingTime=23:00
    const [hour] = closingTime.split(":").map(Number); //split the hours and minutes
    //subtract 1 hour 
    let endHour = hour - 1;

    // if(endHour<0){
    //     endHour +=0;
    // }

    const isPastDay = (day) => {
        return day <= new Date();
    }


    const [selectedTime, setselectedTime] = useState();

    useEffect(() => {
        getTime();
    }, [])
    const getTime = () => {
        const timeList = [];

        // Add time slots from 11:00 AM to 12:30 PM
        for (let i = newHours; i <= endHour; i++) {
            timeList.push({ time: `${i}:00` });
            timeList.push({ time: `${i}:30` });
        }
        settimeSlot(timeList);
    }


    const [headCount, setheadCount] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    // const [errors,seterrors]=useState({});

    const { user } = useKindeBrowserClient();

    const randomId = "RID" + Math.random().toString(36).substring(2, 8).toUpperCase();


    const bookingInfo = async () => {
        const data = {
            data: {
                UserName: user.given_name + " " + user.family_name,
                Kinde_id: user.id,
                UserEmail: user.email,
                UserPhone: phoneNumber,
                Date: date,
                Time: selectedTime,
                HeadCount: headCount,
                ReservationId: randomId,
                restaurant: restaurant.id
            }
        }
        // GlobalApi.seatBooking(data).then(resp => {
        //     // console.log(resp);
        //     if (resp) {
        //         toast("Reservation Confirmed. Details sent to your Email.", {
        //             style: {
        //                 background: 'black',
        //                 color: 'white',
        //                 border: '1px solid black'
        //             }
        //         });
        //     }
        // })
        try {
            const resp = await GlobalApi.seatBooking(data);
            if (resp) {
                toast("Reservation Confirmed. Details sent to your Email.", {
                    style: { background: 'black', color: 'white', border: '1px solid black' }
                });
                await sendEmail(); // send email only after booking
            }
        } catch (err) {
            console.error("Booking failed:", err);
        }
    }



    //for mail
    function sendEmail() {
        axios.post("http://localhost:1337/api/send-email", {
            to: user.email,
            subject: `Your Seat Reservation Confirmation – [${restaurant.Name}]`,
            message: `<pre> Hello ${user.given_name + " " + user.family_name}, Your reservation has been successfully confirmed.

Reservation Details:
- Reservation ID: ${randomId}
- Restaurant Name: ${restaurant.Name}
- Address:  ${restaurant.Address}, ${restaurant.City}
- Contact: ${restaurant.Phone}
- Date: ${date}
- Time: ${selectedTime}
- Number of Guests: ${headCount}

Please arrive at least 10 minutes before your reserved time. If you wish to make any changes or cancel your reservation, contact us at ${restaurant.Phone}.

We look forward to serving you.

Best regards,
${restaurant.Name} Team
           </pre> `
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild><Button className='bg-primary-color border-1 border-primary-color hover:bg-white hover:text-primary-color'>Book Now</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center text-gray-600">Book Your Dining</DialogTitle>
                    </DialogHeader>
                    <div className=''>
                        <div className='grid md:grid-cols-2 gap-4'>
                            {/* calender  */}
                            <div className='border-1 border-gray-400 rounded-lg'>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border shadow-sm"
                                    captionLayout="dropdown"
                                    disabled={isPastDay}
                                />
                            </div>
                            {/* time  */}
                            <div className=''>
                                <div className='grid grid-cols-3 gap-2  border-1  rounded-lg p-5 border-gray-400'>
                                    {timeSlot?.map((item, index) => (<h2 onClick={() => setselectedTime(item.time)} className={`p-2 border rounded-lg hover:bg-primary-color hover:text-white  cursor-default text-center${item.time == selectedTime && ' bg-primary-color text-white'}`} key={index}>{item.time}</h2>

                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* HeadCount and Phone Number  */}
                        <div className='grid md:grid-cols-2 m-2  p-2 border-1 rounded-lg border-gray-400'>
                            {/* HeadCount  */}
                            <div>
                                <div>
                                    <h2>Enter Head Count</h2>
                                    <Input value={headCount} onChange={(e) => setheadCount(e.target.value)} type="number" placeholder="Max 10 Allowed..." />
                                </div>
                            </div>
                            {/* Phone Number  */}
                            <div>
                                <div>
                                    <h2>Enter Phone Number</h2>
                                    <Input value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)} type="number" placeholder="Must be 10 digit..." />
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <div className='flex gap-2'>
                                <Button hidden={!(date && selectedTime && headCount > 0 && headCount <= 10 && phoneNumber.length == 10)} className='bg-primary-color hover:bg-blue-500' type="submit"
                                    onClick={async () => {
                                        await sendEmail();
                                        bookingInfo();
                                    }}
                                >Confirm</Button>
                                <Button className='' type="submit">Close</Button>
                            </div>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default BookRestaurant

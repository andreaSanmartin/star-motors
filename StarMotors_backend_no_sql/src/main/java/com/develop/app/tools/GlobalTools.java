package com.develop.app.tools;

import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class GlobalTools {

    public Date parsingDate(String date) {

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date parsedDate = null;
        try {
            parsedDate = dateFormat.parse(date.substring(0, 10));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return parsedDate;
    }
}

const columns = [
  "PID",
  "StartDate",
  "csad",
  "cnerv",
  "cupst",
  "cangr",
  "cfrust",
  "cstrs",
  "cbrd",
  "cext",
  "calrt",
  "cstrng",
  "chap",
  "crlx",

  "wconstmt",
  "cclr",
  "ctaobs",
  "ctaomu",
  "cstrgcrv",
  "cstrtcrv",
  "cimpsbr",
  "ccnfsbr",
  "cwhere",
  "cwhat",
  "calone",
  "cwhowth",
  "cwhowtho",
  "cclose",
  "cwevusdop",
  "cwfndop",
  "cwusop",
  "cusoplm",
  "hsad",
  "hnerv",
  "hupst",
  "hangr",
  "hfrust",
  "hstrs",
  "hbrd",
  "hexct",
  "halrt",
  "hstrng",
  "hrlx",
  "hhap",
  "hlbmusop",
  "htaomu",
  "hstrgcrv",
  "hlcrvbusd",
  "himpsbr",
  "hcnfsbr",
  "hwhere",
  "hwhat",
  "halone",
  "hwhowth",
  "hwhowtho",
  "her1lg",
  "htbcc",
  "halch",
  "hmrj",
  "hstmlt",
  "hdwnr",
  "hpsch",
  "hnidn",
  "ctbcc",
  "calch",
  "cmrj",
  "cstmlt",
  "cdwnr",
  "cpsch",
  "cnidn",
  "wsad ",
  "wnerv",
  "wupst ",
  "wangr ",
  "wfrust ",
  "wstrs ",
  "wbrd",
  "wexct ",
  "walrt",
  "wstrng",
  "wrlx",
  "whap",
  "wtaobs",
  "wtaomu",
  "wstrgcrv",
  "wstrtcrv",
  "wimpsbr",
  "wcnfsbr",
  "wwhen",
  "wclear",
  "wwhere",
  "wwhat",
  "walone",
  "wwhowth",
  "wwhowtho",
  "wclose",
  "wwevusdop",
  "wwusop",
  "wwfndop",
  "wwrspfl",
  "wanyrespfl",
  "wwhatdd",
  "wer",
  "werlng",
  "werbtr"
];
export const convertJSONtoCSV = data => {
  const { first_name, last_name, mobile_number, email, surveyList = [] } = data;
  let csv = "";
  csv += columns.join(",") + "\n";
  surveyList.forEach(element => {
    const { createdAt, answers = {} } = element;
    let row = [];
    row.push(mobile_number, createdAt);
    let q1 = answers[1] || {};
    row.push(q1[1]); // csad
    row.push(q1[2]); // cnerv
    row.push(q1[3]); // cupst
    row.push(q1[4]); // cangr
    row.push(q1[5]); // cfrust
    row.push(q1[6]); // cstrs
    row.push(q1[7]); // cbrd
    row.push(q1[9]); // cext
    row.push(q1[10]); // calrt
    row.push(q1[11]); // cstrng
    row.push(q1[8]); // chap
    row.push(q1[12]); // crlx

    row.push(answers[2]); // wconstmt

    row.push(answers[3]); // cclr

    row.push(answers[4]); // ctaobs

    row.push(answers[5]); // ctaomu

    row.push(answers[6]); // cstrgcrv

    row.push(answers[7]); // cstrtcrv

    row.push(answers[8]); // cimpsbr

    row.push(answers[9]); // ccnfsbr

    row.push(answers[10]); // cwhere

    row.push(answers[11]); // cwhat

    row.push(answers[12]); // calone

    row.push(answers[13]); // cwhowth

    row.push(answers[14]); // cclose

    row.push(answers[15]); // cwevusdop

    row.push(answers[16]); // cwfndop

    row.push(answers[17]); // cwusop

    row.push(answers[18]); // cusoplm

    let q19 = answers[19] || {};
    row.push(q19[1]); // hsad
    row.push(q19[2]); // hnerv
    row.push(q19[3]); // hupst
    row.push(q19[4]); // hangr
    row.push(q19[5]); // hfrust
    row.push(q19[6]); // jstrs
    row.push(q19[7]); // hbrd
    row.push(q19[9]); // hexct
    row.push(q19[10]); // halrt
    row.push(q19[11]); // hstrng
    row.push(q19[12]); // hrlx
    row.push(q19[8]); // hhap

    row.push(answers[20]); // hlbmusop

    row.push(""); // htaomu

    row.push(answers[21]); // hstrgcrv

    row.push(answers[22]); // hlcrvbusd

    row.push(answers[23]); // himpsbr

    row.push(answers[24]); // hcnfsbr

    row.push(answers[25]); // hwhere

    row.push(answers[26]); // hwhat

    row.push(answers[27]); // halone

    row.push(answers[28]); // hwhowth

    row.push(answers[29].value); // hwhowtho

    row.push(answers[30]); // her1lg

    let q32 = answers[32] || [];
    row.push((q32.find(ele => ele.value == 0) || {}).value); // htbcc
    row.push((q32.find(ele => ele.value == 1) || {}).value); // htbcc
    row.push((q32.find(ele => ele.value == 2) || {}).value); // htbcc
    row.push((q32.find(ele => ele.value == 3) || {}).value); // htbcc
    row.push((q32.find(ele => ele.value == 4) || {}).value); // htbcc
    row.push((q32.find(ele => ele.value == 5) || {}).value); // htbcc
    row.push((q32.find(ele => ele.value == 6) || {}).value); // htbcc

    let q33 = answers[33] || [];
    row.push((q33.find(ele => ele.value == 0) || {}).value); // htbcc
    row.push((q33.find(ele => ele.value == 1) || {}).value); // htbcc
    row.push((q33.find(ele => ele.value == 2) || {}).value); // htbcc
    row.push((q33.find(ele => ele.value == 3) || {}).value); // htbcc
    row.push((q33.find(ele => ele.value == 4) || {}).value); // htbcc
    row.push((q33.find(ele => ele.value == 5) || {}).value); // htbcc
    row.push((q33.find(ele => ele.value == 6) || {}).value); // htbcc

    let q34 = answers[34] || {};
    row.push(q34[1]); // hsad
    row.push(q34[2]); // hnerv
    row.push(q34[3]); // hupst
    row.push(q34[4]); // hangr
    row.push(q34[5]); // hfrust
    row.push(q34[6]); // jstrs
    row.push(q34[7]); // hbrd
    row.push(q34[9]); // hexct
    row.push(q34[10]); // halrt
    row.push(q34[11]); // hstrng
    row.push(q34[12]); // hrlx
    row.push(q34[8]); // hhap

    row.push(answers[35]); //wstrgcrv
    row.push(answers[36]); //wstrtcrv
    row.push(answers[37]); //wimpsbr
    row.push(answers[38]); //wcnfsbr
    row.push(answers[39]); //wwhen
    row.push(answers[40]); //wclear
    row.push(answers[41]); //wwhere
    row.push(answers[42]); //wwhat
    row.push(answers[43]); //walone
    row.push(answers[44]); //wwhowth
    row.push(answers[45]); //wclose
    row.push(answers[46]); //wwevusdop
    row.push(answers[47]); //wwusop
    row.push(answers[48]); //wwfndop
    row.push(answers[49]); //wwrspfl
    row.push(answers[50]); //wanyrespfl
    row.push(answers[51]); //wwhatdd
    row.push(answers[52]); //wwhatdd
    row.push(answers[53]); //werlng
    row.push(answers[54]); //werbtr
    row.push(answers[55]); //wwhatdd

    csv += row.join(",") + "\n";
  });
  return csv;
};

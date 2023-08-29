const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const final2014 = fifaData.find((item) => {
  return item.Year === 2014 && item.Stage === "Final";
});

// console.log("G1a: ");
// console.log(final2014["Home Team Name"]);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
// console.log("G1b: ");
// console.log(final2014["Away Team Name"]);

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
// console.log("G1c: ");
// console.log(final2014["Home Team Goals"]);

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
// console.log("G1d: ");
// console.log(final2014["Away Team Goals"]);

//(e) 2014 Dünya kupası finali kazananı*/

function getWinnerName(matchObj) {
  if ("" !== matchObj["Win conditions"]) {
    const idx = matchObj["Win conditions"].indexOf(" win");
    return matchObj["Win conditions"].slice(0, idx);
  } else if (matchObj["Home Team Goals"] > matchObj["Away Team Goals"]) {
    return matchObj["Home Team Name"];
  } else {
    return matchObj["Away Team Name"];
  }
}

//console.log("G1e: ");
// console.log(getWinnerName(final2014));

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(arrMatches) {
  return arrMatches.filter((item) => {
    return item.Stage === "Final";
  });
}

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(arrMatches, cbFinderFinals) {
  const finals = cbFinderFinals(arrMatches);

  return finals.map((item) => {
    return item.Year;
  });
}

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(arrMatches, cbFinderFinals) {
  const finals = cbFinderFinals(arrMatches);

  return finals.map((item) => {
    return getWinnerName(item);
  });
}
// console.log("G4:");
// console.log(Kazananlar(fifaData, Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(
  arrMatches,
  cbFinderFinals,
  cbFinderYears,
  cbFinderWinners
) {
  const finals = cbFinderFinals(arrMatches);
  const years = cbFinderYears(finals);
  const winners = cbFinderWinners(finals);

  const retArr = [];
  for (let i = 0; i < finals.length; i++) {
    retArr.push(`${years[i]} yılında, ${winners[i]} dünya kupasını kazandı!`);
  }

  return retArr;
}

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(arrFinals) {
  let cntGoals = arrFinals.reduce((total, item) => {
    return total + item["Home Team Goals"] + item["Away Team Goals"];
  }, 0);

  return (cntGoals / arrFinals.length).toFixed(2);
}

function getTeamNameWithInitials(arrMatchObjs, initials) {
  let isHomeTeam = false;
  const mathcObj = arrMatchObjs.find((item) => {
    if (initials === item["Home Team Initials"]) {
      isHomeTeam = true;
    }

    return isHomeTeam || initials === item["Away Team Initials"];
  });

  return isHomeTeam === true
    ? mathcObj["Home Team Name"]
    : mathcObj["Away Team Name"];
}

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

//takımın oynadığı final maçlarını bul
//bahsi geçen takım bu maçta home mu away mi?
//maçı home mu kazandı yoksa away team mi?
//maçı kazanan home ise ve initialsTeam home takım ise cntWin++

function UlkelerinKazanmaSayilari(arrMatches, initialsTeam) {
  const finals = Finaller(arrMatches);
  const teamName = getTeamNameWithInitials(arrMatches, initialsTeam);

  return finals.reduce((cntWin, match) => {
    if (getWinnerName(match) === teamName) {
      cntWin++;
    }
    return cntWin;
  }, 0);
}

console.log("GB1:");
console.log(UlkelerinKazanmaSayilari(fifaData, "ARG"));

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function getTeamNames(arrMatches) {
  const teamNames = [];

  for (const iterator of arrMatches) {
    if (!teamNames.includes(iterator["Home Team Name"]))
      teamNames.push(iterator["Home Team Name"]);
    if (!teamNames.includes(iterator["Away Team Name"]))
      teamNames.push(iterator["Away Team Name"]);
  }

  teamNames.sort((a, b) => a.localeCompare(b));
  return teamNames;
}

//console.log("Team names");
//console.log(getTeamNames(fifaData));

// final maclarını bul
// finale katılan takım isimlerini bul
// bu takım isimleri arrayinden {teamName: ..., totalGoal: 0} objelerinden oluşan bir obj array yap
// final maclarını gez takımların gollerini obj arrayde uygun yerlere ekle
// sonra bu arrayi gez max gol saayısını bul

function EnCokGolAtan(arrMatches) {
  const finals = Finaller(arrMatches);
  const teams = getTeamNames(finals);

  const teamObjs = teams.map((item) => {
    return { teamName: item, totalGoal: 0 };
  });

  for (const final of finals) {
    //find home team and increase its total goal
    teamObjs.find((item) => {
      return item.teamName === final["Home Team Name"];
    }).totalGoal += final["Home Team Goal"];

    //find away team and increase its total goal
    teamObjs.find((item) => {
      return item.teamName === final["Away Team Name"];
    }).totalGoal += final["Away Team Goal"];
  }

  const maxGoalObj = teamObjs[0];

  for (const iterator of teamObjs) {
    if (iterator.totalGoal > maxGoalObj.totalGoal) maxGoalObj = iterator;
  }

  return maxGoalObj.teamName;
}

console.log("GB2:");
console.log(EnCokGolAtan(fifaData));
/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

//final maclarini bul
//final macina katilan takim isimlerini iceren array olustur
//bu takımlardan {teamName: ..., totalGoal: 0} objelerinden oluşan bir obj array yap
//final maclarını gez takımların gollerini obj arrayde uygun yerlere ekle
//sonra bu arrayi gez max gol saayısını bul

function EnKotuDefans(arrMatches) {
  const finals = Finaller(arrMatches);
  const teams = getTeamNames(finals);

  const teamObjs = teams.map((item) => {
    return { teamName: item, totalGoal: 0 };
  });

  for (const final of finals) {
    //find home team and increase its total goal
    teamObjs.find((item) => {
      return item.teamName === final["Home Team Name"];
    }).totalGoal += final["Away Team Goal"];

    //find away team and increase its total goal
    teamObjs.find((item) => {
      return item.teamName === final["Away Team Name"];
    }).totalGoal += final["Home Team Goal"];
  }

  const maxGoalObj = teamObjs[0];

  for (const iterator of teamObjs) {
    if (iterator.totalGoal > maxGoalObj.totalGoal) {
      maxGoalObj = iterator;
    }
  }

  return maxGoalObj.teamName;
}

console.log("GB3:");
console.log(EnKotuDefans(fifaData));
/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "./components/ui/card";
import { Trophy, Medal, Star, Timer as TimerIcon, Award, Check, X } from 'lucide-react';
import { Timer } from './components/Timer';
import { Books } from './components/Books';
import { HowToPlay } from './components/HowToPlay';
import { FeedbackOverlay } from './components/FeedbackOverlay';
import { ImageZoom } from './components/ImageZoom';


const BASEBALL_MOMENTS = [
  {
    id: 1,
    year: 1935,
    image: '/bismarck.jpg',
    hint: "Satchel Barnstorms in Bismarck North Dakota",
    description: "Satchel Barnstorms in Bismarck North Dakota",
    funFact: "This team photograph from 1935 offers a fascinating glimpse into an important moment in baseball history. According to author Tom Dunkel, it's the only known picture of the Bismarck team taken just before they left for the National Tournament. The lineup features an integrated group of players, with both Black and white athletes on the squad. This was highly unusual for the time, as the sport remained largely segregated. In the image, we can see player-manager Neil Churchill kneeling in the front row, while star pitcher Satchel Paige stands alongside his teammates. Notably, white outfielder Moose Johnson has his hand resting on Paiges shoulder, a gesture that symbolizes the camaraderie and acceptance within the team. Today, baseball historians view the 1935 Bismarck squad as a pivotal step toward the integration of the major leagues. While Jackie Robinson would not break the color barrier until 1947, this team foreshadowed the sport's more inclusive future. Their photograph serves as a tangible reminder of the progress that was slowly taking shape, even amidst the widespread segregation of the era."
  },
  {
    id: 2,
    year: 1951,
    image: '/1951mantle.jpg',
    hint: "The Commerce Comet's Rookie Card",
    description: "Mickey Mantle's rookie season with the Yankees",
    funFact: "This image captures Mickey Mantle during his rookie season with the New York Yankees in 1951. The 19-year-old from Commerce, Oklahoma was initially assigned uniform #6, following in the footsteps of Babe Ruth (#3), Lou Gehrig (#4), and Joe DiMaggio (#5). However, after struggling and being briefly sent down to the minors, he returned wearing his iconic #7. Despite the early setback, Mantle would go on to become one of baseball's greatest switch-hitters, winning three AL MVP awards and helping the Yankees capture seven World Series titles during his 18-year career."
  },
  {
    id: 3,
    year: 1913,
    image: '/1913.jpg',
    hint: "Baseball's Brainy Ballplayer",
    description: "Johnny Evers of the Chicago Cubs",
    funFact: "Johnny Evers, immortalized in baseball lore as the pivot man in the famous 'Tinker to Evers to Chance' double play combination, was known as one of the game's most intelligent and intense players. This 1913 photograph was taken during his final season with the Chicago Cubs, where he had been a key part of their dynasty that won four National League pennants and two World Series (1907, 1908). Standing just 5'9\" and weighing 125 pounds, Evers earned the nickname 'The Human Crab' for his unique, sideways defensive style at second base. He was elected to the Baseball Hall of Fame in 1946."
  },
  {
    id: 4,
    year: 1991,
    image: '/1991.jpg',
    hint: "World Series Collision",
    description: "World Series Collision",
    funFact: "This image shows a dramatic moment between Lonnie Smith (runner) and Brian Harper (catcher) during the 1991 World Series between the Atlanta Braves and the Minnesota Twins. The 1991 World Series, often dubbed the Greatest World Series Ever Played, featured a record four games decided by a single run, with three of them going into extra innings. The Minnesota Twins won Game 7 in a nail-biting 1-0 victory, clinching the championship in one of the most intense pitching duels in MLB history! The play in the image exemplifies the grit and intensity that defined this iconic series."
  },
  {
    id: 5,
    year: 1896,
    image: '/Honus1896.jpg',
    hint: "The Flying Dutchman's Minor League Days",
    description: "Paterson Silk Weavers, Atlantic League, 1896",
    funFact: "This remarkable 1896 photo captures two future Hall of Famers at the start of their careers: 22-year-old Honus Wagner (top, third from left) and Ed Barrow (middle, second from left). While Wagner would become baseball's greatest shortstop, Barrow would make his mark as an executive, helping build the Yankees dynasty of the 1920s and 1930s. In 1896, Wagner was still developing his skills in the minors, playing for $35 a month with the Paterson Silk Weavers. His manager? None other than Ed Barrow, who would later say he knew Wagner was special when he saw him jump a fence from a standing position while chasing a foul ball."
  },
  {
    id: 7,
    year: 1961,
    image: '/1961.jpg',
    hint: "The Reluctant Record Breaker",
    description: "Roger Maris in the dugout",
    funFact: "Roger Maris, born in Hibbing, Minnesota and raised in North Dakota, became known as baseball's 'reluctant superstar.' Despite breaking Babe Ruth's single-season home run record in 1961 with 61 homers, Maris never seemed comfortable with fame. The pressure of chasing Ruth's record was so intense that his hair began falling out during the season. Commissioner Ford Frick's decision to put an asterisk next to his record (because Maris hit his in a 162-game season versus Ruth's 154) added to the controversy. The asterisk, which technically never existed in the record books but lived on in baseball lore, wasn't formally removed until 1991 - six years after Maris's death."
  },
  {
    id: 8,
    year: 1913,
    image: '/1913Thorpe.jpg',
    hint: "History's Greatest All-Around Athlete",
    description: "Jim Thorpe with the New York Giants",
    funFact: "Jim Thorpe might be the most talented athlete in American history. A member of the Sac and Fox Nation, he won Olympic gold medals in both the pentathlon and decathlon in 1912, played six seasons of Major League Baseball, was an inaugural member of the Pro Football Hall of Fame, and even played professional basketball. After winning his Olympic medals, King Gustav V of Sweden told him, 'Sir, you are the greatest athlete in the world,' to which Thorpe simply replied, 'Thanks, King.' Tragically, his Olympic medals were stripped away when it was discovered he had played semi-pro baseball (though they were posthumously restored in 1982). Despite this setback, he went on to play MLB baseball from 1913 to 1919, including time with the New York Giants, Cincinnati Reds, and Boston Braves."
  },
  {
    id: 9,
    year: 1982,
    image: '/1982.jpg',
    hint: "Gary Carter and a young Tim Raines among other Expos stars",
    description: "Montreal Expos stars",
    funFact: "This 1982 photo captures a golden era of Montreal Expos baseball, featuring future Hall of Famers Gary Carter and Tim Raines. The Expos' distinctive powder blue uniforms and tricolor caps became iconic symbols of baseball in Montreal. The team was loaded with talent, including Andre Dawson, who would win the NL Rookie of the Year in 1977, and Tim Raines, who led the National League in stolen bases from 1981-1984. Despite never winning a World Series, the Expos of this era were among the most exciting teams in baseball, regularly drawing over 2 million fans to Olympic Stadium."
  },
  {
    id: 10,
    year: 1911,
    image: '/1911_Honus_Wagner.jpg',
    hint: "Honus Wagner",
    description: "Honus Wagner",
    funFact: "Honus Wagner earned several memorable nicknames during his legendary career. He was most famously known as 'The Flying Dutchman' due to his German heritage and incredible speed on the basepaths. His Pittsburgh teammates also called him 'Hans' (short for Johannes, his birth name) and 'Old Honus.' But perhaps his most colorful nickname was 'Bowlegged Beauty,' a reference to his distinctive curved legs that didn't stop him from becoming one of baseball's most graceful shortstops."
  },
  {
    id: 11,
    year: 1895,
    image: '/1895Michigan.jpg',
    hint: "Michigan",
    description: "Michigan",
    funFact: "Back row: Edward Weeks, Edmund Shields, Herbert Gallup, Frank Sexton, William Holmes. Middle row: William McKenzie, Charles Watkins, Ralph Russell, Guy Alonzo Miller, Edwin Deans. Front row: John Condon, William Waterman, John Bloomingston."
  },
  {
    id: 12,
    year: 1984,
    image: '/kirby.jpg',
    hint: "The Future Hall of Famer's Rookie Season",
    description: "Kirby Puckett's rookie season with the Minnesota Twins",
    funFact: "Kirby Puckett's path to the majors was anything but typical. He was discovered by Twins scout Jim Rantz while playing in a semi-pro tournament in Illinois. After being drafted, Puckett rocketed through the minor leagues, making his MLB debut on May 8, 1984. In his very first game, he went 4-for-5 with a stolen base, becoming the 9th player in MLB history to collect four hits in their debut. Despite his relatively late start in baseball and standing just 5'8\", Puckett would go on to become one of baseball's most beloved figures, leading the Twins to two World Series championships and earning a place in Cooperstown."
  },
  {
    id: 13,
    year: 1981,
    image: '/boggs.jpg',
    hint: "longest game in history",
    description: "boggs",
    funFact: "Boggs vs Ripken in the longerst game ever played. Boggs and Ripken were top prospects for the Red Sox and Orioles, respectively. The Pawtucket Red Sox hosted the Rochester Red Wings on a cold and windy spring Saturday, April 18. After 32 innings, with the game tied at 2, the decision was made to finish the game at a later date. It was 4:09 AM. According to reports, 19 fans remained in the stands; each one was granted lifetime passes to games at McCoy Stadium in Pawtucket. The Red Sox won the game 3-2 in 33 innings when the game resumed on June 23."
  },
  {
    id: 14,
    year: 1901,
    image: '/1901Tug.jpg',
    hint: "Cleveland's First AL Season",
    description: "1901 Cleveland Blues Team Photo",
    funFact: "This Cleveland team played in the very first American League game ever on April 24, 1901. Then called the Blues and managed by Jimmy McAleer (in derby hat), they would later become known as the Indians in 1915 and Guardians in 2022. On May 23rd of their inaugural season, they pulled off one of the greatest comebacks in baseball history, scoring 9 runs with two outs in the ninth to win 14-13.",
    source: "https://sabr.org/gamesproj/game/may-23-1901-hopeless-defeat-turned-into-glorious-victory/"
  },
  {
    id: 6,
    year: 1933,
    image: '/1933.jpg',
    hint: "The First All-Star Game",
    description: "The First MLB All-Star Game at Comiskey Park",
    funFact: "This image captures a historic moment in baseball history - the first Major League Baseball All-Star Game, played on July 6, 1933, at Chicago's Comiskey Park. The game was conceived by Chicago Tribune sports editor Arch Ward as part of the city's Century of Progress Exposition. The American League, led by Babe Ruth (who hit the first home run in All-Star Game history), defeated the National League 4-2. The success of this 'one-time' exhibition led to it becoming an annual tradition, marking one of baseball's most enduring innovations from the Great Depression era. The game featured an incredible lineup of future Hall of Famers, including Lou Gehrig, Jimmie Foxx, Al Simmons, and Charlie Gehringer for the American League, facing Carl Hubbell, Bill Terry, Pie Traynor, and Chuck Klein of the National League."
  },
  {
    id: 17,
    year: 1951,
    image: '/Mays1951.jpg',
    hint: "The Say Hey Kid's Rookie Season",
    description: "Willie Mays' Rookie Season with the New York Giants",
    funFact: "This photograph captures Willie Mays during his remarkable rookie season with the New York Giants in 1951. Despite a rough 1-for-26 start to his career that had him doubting himself, the 20-year-old center fielder would go on to win the National League Rookie of the Year award, batting .274 with 20 home runs. His natural talent and infectious enthusiasm earned him the nickname 'The Say Hey Kid.' That same year, Mays would help the Giants complete their historic comeback against the Dodgers, culminating in Bobby Thomson's 'Shot Heard 'Round the World.' This was just the beginning of a legendary 22-year career that would see Mays become one of baseball's greatest all-around players, known for his spectacular catches, powerful hitting, and baserunning prowess."
  },
  {
    id: 18,
    year: 1909,
    image: '/stPaul.jpg',
    hint: "The St. Paul Colored Gophers",
    description: "St. Paul Colored Gophers Team Photo",
    funFact: "The St. Paul Colored Gophers were one of the most formidable Black baseball teams of the pre-Negro Leagues era. In 1909, they were considered by many to be the strongest African American team in the country. The team featured several legendary players, including Bobby Marshall, who would later become one of the first African American players in the NFL. The Colored Gophers regularly competed against - and often defeated - white teams, helping to demonstrate the high caliber of Black baseball talent decades before integration. Their success helped pave the way for the more formally organized Negro National League, which would be established in 1920 by Rube Foster."
  },
  {
    id: 19,
    year: 1924,
    image: '/ruthKnockedOut.jpg',
    hint: "The Babe's Dangerous Collision",
    description: "Babe Ruth Knocked Unconscious at Griffith Stadium",
    funFact: " On July 5th, 1924, in the fourth inning of a game against the Washington Senators at Griffith Stadium, Babe Ruth chased a long fly ball and crashed full-speed into the concrete wall. The collision knocked him unconscious for nearly five minutes, creating a scene that stunned the crowd into silence. Despite the severity of the impact, Ruth not only returned to the game but also hit a double in his next at-bat. This incident exemplified Ruth's legendary toughness and dedication - after the game he simply said, 'I feel a bit woozy, but outside of a slight headache, I'm all right.' The photo became one of baseball's most memorable images, showing the dramatic moment when even the seemingly invincible Babe Ruth proved mortal.",
    source: "https://www.loc.gov/item/2016838013/"
  },
  {
    id: 20,
    year: 1969,
    image: '/metspitchers.jpg',
    hint: "The Miracle Mets' Arms",
    description: "1969 Mets Pitching Staff",
    funFact: "The '69 Mets pitching staff was so dominant that Tom Seaver (25-7), Jerry Koosman (17-9), Gary Gentry (13-12), and Nolan Ryan combined for an incredible 28 shutouts. Their team ERA of 2.99 was tops in the league, and they would go on to shock the heavily favored Baltimore Orioles in the World Series."
  },
  {
    id: 21,
    year: 1946,
    image: '/fellerpaige.jpg',
    hint: "Two Legendary Fireballers Face Off",
    description: "Bob Feller vs. Satchel Paige",
    funFact: "This rare photo captures a historic matchup between two of baseball's greatest pitchers. Bob Feller and Satchel Paige faced off in numerous barnstorming games, with Feller later saying Paige was the best pitcher he ever saw. In their matchups, Paige's teams won 6 of the 9 documented games against Feller's teams."
  },
  {
    id: 22,
    year: 1914,
    image: '/ruthredsox.jpg',
    hint: "The Babe as a Rookie Pitcher",
    description: "Babe Ruth with the Boston Red Sox",
    funFact: "Before becoming baseball's greatest slugger, Babe Ruth was one of the American League's best left-handed pitchers. He went 89-46 with a 2.28 ERA in six seasons as a Red Sox pitcher before being converted to an outfielder. His pitching was so dominant that he once threw a 13-inning complete game victory in the World Series."
  },
  {
    id: 23,
    year: 1985,
    image: '/1985bluejays.jpg',
    hint: "First Division Title in Toronto",
    description: "1985 Toronto Blue Jays",
    funFact: "The '85 Blue Jays captured their first AL East title with a franchise-record 99 wins. Led by Dave Stieb's pitching (14-13, 2.48 ERA) and Jesse Barfield's 27 home runs, they became the first team outside the United States to reach the playoffs."
  },
  {
    id: 24,
    year: 1957,
    image: '/hank.jpg',
    hint: "The Braves' Big Three",
    description: "Aaron, Mathews and Adcock before World Series",
    funFact: "Photographed before Game 1 of the '57 Series, the Braves' power trio would help Milwaukee defeat the Yankees. Hank Aaron dominated the Series with a .393 average, 3 home runs, and 7 RBI, leading the Braves to their first championship since 1914."
  },
  {
    id: 25,
    year: 1917,
    image: '/ernieShore.jpg',
    hint: "The Most Unusual Perfect Game",
    description: "Ernie Shore's Relief Perfect Game",
    funFact: "On June 23, 1917, Babe Ruth started for the Red Sox and walked Ray Morgan to lead off the game. After arguing balls and strikes, Ruth told umpire Brick Owens 'If you chase me, I'll punch your face.' When ejected, Ruth made good on his threat, hitting Owens behind the ear. Ernie Shore came in, Morgan was caught stealing, and Shore retired all 26 batters he faced in a 4-0 win. Ruth got a 10-game suspension.",
    source: "https://baseballhall.org/discover/babe-ruth-made-history-with-help-from-ernie-shore"
  },
  {
    id: 26,
    year: 1947,
    image: '/ted.jpg',
    hint: "The Greatest Hitter Who Ever Lived",
    description: "Ted Williams at Fenway Park",
    funFact: "Ted Williams was a fighter pilot in both WWII and Korea, missing nearly 5 full seasons in his prime. Despite this, he still hit .344 lifetime and was the last player to hit .400. He also refused to tip his cap to fans for 24 years, until his final at-bat homer in 1960."
  },
  {
    id: 27,
    year: 1975,
    image: '/Fisk.jpg',
    hint: "Stay Fair!",
    description: "Carlton Fisk's Famous Wave",
    funFact: "The iconic image of Fisk waving his Game 6 homer fair only exists because the cameraman was distracted by a rat. He was supposed to follow the ball but got startled and kept the camera on Fisk instead, creating one of baseball's most memorable moments."
  }
];

const ACHIEVEMENTS = {
  FIRST_HIT: { id: 'FIRST_HIT', name: 'Rookie of the Year', description: 'Get your first perfect guess', icon: Star },
  STREAK_3: { id: 'STREAK_3', name: 'Triple Play', description: '3 perfect guesses in a row', icon: Trophy },
  SPEED_DEMON: { id: 'SPEED_DEMON', name: 'Speed Demon', description: 'Perfect guess under 10 seconds', icon: TimerIcon },
  POWER_HITTER: { id: 'POWER_HITTER', name: 'Power Hitter', description: 'Score over 1000 points', icon: Award },
  NO_STRIKES: { id: 'NO_STRIKES', name: 'Perfect Game', description: 'Complete a round with no outs', icon: Medal },
  GOOSE_EGG: { id: 'GOOSE_EGG', name: 'Goose Egg', description: 'Zero points? Maybe try cricket instead...', icon: X }
};

const SOUND_EFFECTS = {
  homeRun: new Audio('/sounds/HR.wav'),
  hit: new Audio('/sounds/hit.mp3'),
  out: new Audio('/sounds/out.wav'),
  achievement: new Audio('/sounds/achievement.wav'),
  sliderTick: new Audio('/sounds/tick2.wav')
};

// Set volume for all sound effects
Object.values(SOUND_EFFECTS).forEach(sound => {
  if (sound === SOUND_EFFECTS.sliderTick) {
    sound.volume = 0.2; // 20% volume for slider tick
  } else {
    sound.volume = 0.2;
  }
});

function getDailyMoment(index = 0) {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  // Calculate the starting index for today's set of 3 images
  // Each day we move forward by 3 images
  const startIndex = (dayOfYear * 3) % (BASEBALL_MOMENTS.length - 2);
  return BASEBALL_MOMENTS[startIndex + index];
}

function getTodayKey() {
  const date = new Date();
  return `baseball-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function loadDailyState() {
  const savedState = localStorage.getItem(getTodayKey());
  if (savedState) {
    const state = JSON.parse(savedState);
    // Check if the saved state is from a previous day
    const savedKey = getTodayKey();
    const currentKey = getTodayKey();
    if (savedKey !== currentKey) {
      // It's a new day, return null to start fresh
      localStorage.removeItem(savedKey);
      return null;
    }
    return state;
  }
  return null;
}

function saveDailyState(state) {
  localStorage.setItem(getTodayKey(), JSON.stringify({
    ...state,
    lastUpdated: new Date().toISOString()
  }));
}


function YearDigit({ digit }) {
  return (
    <div 
      className="w-14 h-[68px] bg-white border-2 border-gray-300 rounded flex items-center justify-center text-4xl font-mono text-blue-900 shadow-lg mx-1"
      style={{ fontFamily: 'Douglas-Burlington-Regular' }}
    >
      {digit}
    </div>
  );
}

function getAllDailyMoments() {
  return [
    getDailyMoment(0),
    getDailyMoment(1),
    getDailyMoment(2)
  ];
}

function GameOver({ score, achievements, onRestart, currentMoment, onShowCollection, onShowBooks, collectedMoments, setAchievements }) {
  const allMoments = getAllDailyMoments();
  const [selectedMoment, setSelectedMoment] = useState(currentMoment);
  
  const correctGuesses = collectedMoments.filter(id => 
    allMoments.some(moment => moment.id === id)
  ).length;

  // Add Goose Egg achievement if score is 0
  useEffect(() => {
    if (score === 0 && !achievements.includes('GOOSE_EGG')) {
      setAchievements([...achievements, 'GOOSE_EGG']);
    }
  }, [score, achievements, setAchievements]);

  function handleShare() {
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' });
    
    // Create boxes string based on collected moments
    const boxes = allMoments.map(moment => 
      collectedMoments.includes(moment.id) ? '🟩' : '⬜'
    ).join('');
    
    const shareText = `⚾️ Baseball Time Machine ${dateStr}\n` +
                     `${boxes}\n` +
                     `${correctGuesses} Perfect ${correctGuesses === 1 ? 'Guess' : 'Guesses'}\n` +
                     `Score: ⭐ ${score} ⭐\n` +
                     `\nPlay at: https://baseballtimemachine.netlify.app/`;

    // Social sharing URLs
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://baseballtimemachine.netlify.app/')}&quote=${encodeURIComponent(shareText)}`;

    // Create share menu with React-style event handling
    const shareMenu = document.createElement('div');
    shareMenu.className = 'fixed inset-0 bg-black/80 z-50 flex items-center justify-center';
    shareMenu.innerHTML = `
      <div class="bg-gray-800 p-6 rounded-lg max-w-sm w-full mx-4 space-y-4 relative">
        <button class="absolute top-2 right-2 text-gray-400 hover:text-white" onclick="this.parentElement.parentElement.remove()">
          ✕
        </button>
        <h3 class="text-white text-xl mb-4" style="font-family: Douglas-Burlington-Regular">Share Your Results</h3>
        <div class="space-y-3">
          <a href="${twitterUrl}" target="_blank" rel="noopener noreferrer" 
             class="flex items-center justify-center gap-2 w-full bg-[#1DA1F2] text-white py-2 px-4 rounded hover:bg-[#1a8cd8] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
            </svg>
            Share on X/Twitter
          </a>
          <a href="${facebookUrl}" target="_blank" rel="noopener noreferrer"
             class="flex items-center justify-center gap-2 w-full bg-[#4267B2] text-white py-2 px-4 rounded hover:bg-[#365899] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
            </svg>
            Share on Facebook
          </a>
          <button id="copyButton"
             class="w-full bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors">
            Copy to Clipboard
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(shareMenu);

    // Add click handler for copy button
    const copyButton = shareMenu.querySelector('#copyButton');
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(shareText);
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          copyButton.textContent = 'Copy to Clipboard';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        copyButton.textContent = 'Failed to copy';
        setTimeout(() => {
          copyButton.textContent = 'Copy to Clipboard';
        }, 2000);
      }
    });
  }

  return (
    <div className="text-center p-8 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <img  
          src="/LOGO.png"
          className="w-full max-w-[472px] sm:max-w-[420px] md:max-w-[525px] mx-auto px-1 sm:px-2 md:px-0"
          alt="The Daily Baseball Photo Trivia Game" 
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Left Column - Score, Share, and Thumbnails */}
        <div className="flex flex-col">
          <div className="bg-gray-800/90 p-6 rounded-lg border border-gray-700">
            <h2 className="text-3xl text-white mb-4 text-center" 
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}>
        Game Over!
      </h2>
            <div 
              className="text-7xl text-green-400 mb-4 text-center"
              style={{ fontFamily: 'Douglas-Burlington-Regular' }}
            >
              {score} points
            </div>
            <div className="text-xl text-[#f5f2e6] mb-6">
              You got {correctGuesses} perfect {correctGuesses === 1 ? 'guess' : 'guesses'}!
            </div>

            {/* Thumbnails Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6 w-full">
              {allMoments.map((moment, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center"
                >
                  <div 
                    className="relative bg-[#f5f2e6] p-1"
                    style={{
                      boxShadow: '3px 2px 4px rgba(0, 0, 0, 0.9)',
                    }}
                  >
                    <div className="absolute -top-1 -left-1 z-10">
                      {collectedMoments.includes(moment.id) ? (
                        <div className="bg-green-500 rounded-full p-1">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="bg-red-500 rounded-full p-1">
                          <X className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <img
                      src={moment.image}
                      alt={moment.description}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <div 
                    className="mt-1 text-lg text-white"
                    style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                  >
                    {moment.year}
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={handleShare}
              className="bg-[#1e4fba] hover:bg-[#2460e6] text-white py-3 px-8 rounded-lg text-2xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-[#1a3f8c] flex items-center justify-center gap-2 w-full mx-auto whitespace-nowrap"
              style={{ fontFamily: 'Douglas-Burlington-Regular' }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
              Share My Results ({correctGuesses}/3)
            </button>
          </div>
        </div>

        {/* Right Column - Achievements */}
        <div className="flex flex-col">
          {achievements.length > 0 ? (
            <>
              <h3 className="text-4xl text-yellow-400 mb-6 text-center"
                  style={{ fontFamily: 'Douglas-Burlington-Regular' }}>
                Boom! Achievements Unlocked!
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {achievements.map((achievementId, index) => {
              const achievement = ACHIEVEMENTS[achievementId];
              const AchievementIcon = achievement.icon;
              return (
                <div 
                  key={achievementId} 
                      className="bg-gray-800/90 p-4 rounded-lg flex items-center transform hover:scale-105 border border-gray-700 shadow-lg"
                >
                      <div className="bg-[#1e4fba] p-3 rounded-full mr-4">
                        <AchievementIcon className="text-[#f5f2e6] w-8 h-8" />
                  </div>
                  <div className="text-left flex-1">
                        <div className="text-xl text-[#f5f2e6] mb-1" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>{achievement.name}</div>
                    <div className="text-gray-400">{achievement.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
            </>
          ) : (
            <div className="text-center text-gray-400 text-xl">
              No achievements unlocked yet!
        </div>
      )}
          </div>
          </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center gap-4">
          <button
            onClick={onRestart}
            className="bg-[#f5f2e6] hover:bg-[#e5e2d6] text-[#1e4fba] py-3 px-8 rounded-lg text-2xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-[#d5d2c6]"
            style={{ fontFamily: 'Douglas-Burlington-Regular' }}
          >
            Play Again
          </button>

          <button
            onClick={onShowCollection}
            className="bg-[#f5f2e6] hover:bg-[#e5e2d6] text-[#1e4fba] py-3 px-8 rounded-lg text-2xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-[#d5d2c6] flex items-center gap-2"
            style={{ fontFamily: 'Douglas-Burlington-Regular' }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="2" y="5" width="16" height="16" rx="2"/>
              <rect x="6" y="3" width="16" height="16" rx="2"/>
              <path d="M22 9v10a2 2 0 0 1-2 2H6"/>
            </svg>
            View Collection
          </button>
        </div>
        
        <button
          onClick={onShowBooks}
          className="text-[#f5f2e6] hover:text-white text-xl transition-all duration-300 ease-in-out underline"
          style={{ fontFamily: 'Douglas-Burlington-Regular' }}
        >
          Recommended Baseball Books
        </button>
      </div>
    </div>
  );
}

function Collection({ onClose, collectedMoments }) {
  // Filter to only show collected moments
  const discoveredMoments = BASEBALL_MOMENTS.filter(moment => 
    collectedMoments.includes(moment.id)
  );
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h2 
            className="text-4xl text-white"
            style={{ fontFamily: 'Douglas-Burlington-Regular' }}
          >
            My Collection ({discoveredMoments.length})
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300"
          >
            Close
          </button>
        </div>
        
        {discoveredMoments.length === 0 ? (
          <div className="text-center text-gray-400 text-xl py-12">
            No photos discovered yet! Get a perfect guess to add photos to your collection.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {discoveredMoments.map((moment, index) => (
              <div 
                key={moment.id}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 animate-fadeIn"
                style={{
                  animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <div 
                  className="relative bg-[#f5f2e6] p-2 cursor-pointer"
                  onClick={() => setSelectedImage(moment)}
                >
                  <img
                    src={moment.image}
                    alt={moment.description}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="p-3">
                  <div className="text-white mb-2" style={{ fontFamily: 'Douglas-Burlington-Regular' }}>
                    {moment.year}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {moment.description}
                  </div>
                </div>
              </div>
            ))}
        </div>
        )}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl w-full mx-auto">
      <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl"
      >
              Close
      </button>
            <div 
              className="relative bg-[#f5f2e6] p-2"
              style={{
                boxShadow: '10px 6px 12px rgba(0, 0, 0, 0.9)',
              }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.description}
                className="w-full h-auto object-contain max-h-[90vh]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BaseballTimeMachine() {
  const [gameState, setGameState] = useState(() => {
    const saved = loadDailyState();
    return saved ? saved.gameState : 'playing';
  });
  const [year, setYear] = useState(() => {
    const saved = loadDailyState();
    return saved ? saved.year : 1950;
  });
  const [outs, setOuts] = useState(() => {
    const saved = loadDailyState();
    return saved ? saved.outs : 0;
  });
  const [score, setScore] = useState(() => {
    const saved = loadDailyState();
    return saved ? saved.score : 0;
  });
  const [feedback, setFeedback] = useState('');
  const [sequenceIndex, setSequenceIndex] = useState(() => {
    const saved = loadDailyState();
    return saved ? saved.sequenceIndex : 0;
  });
  const [currentMoment, setCurrentMoment] = useState(() => getDailyMoment(sequenceIndex));
  const [achievements, setAchievements] = useState(() => {
    const saved = loadDailyState();
    return saved ? saved.achievements : [];
  });
  const [perfectStreak, setPerfectStreak] = useState(() => {
    const saved = loadDailyState();
    return saved ? saved.perfectStreak : 0;
  });
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [guessStartTime, setGuessStartTime] = useState(null);
  const [time, setTime] = useState(30);
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('baseball-muted');
    return saved ? JSON.parse(saved) : false;
  });
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [collectedMoments, setCollectedMoments] = useState(() => {
    const saved = localStorage.getItem('baseball-collection');
    return saved ? JSON.parse(saved) : [];
  });
  const [showCollection, setShowCollection] = useState(false);
  const [strikes, setStrikes] = useState(() => {
    const saved = loadDailyState();
    return saved?.strikes || 0;
  });
  const [previousDifference, setPreviousDifference] = useState(null);
  const [showBooks, setShowBooks] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [showZoom, setShowZoom] = useState(false);

  useEffect(() => {
    if (isTimerActive && time === 0) {
      handleTimeout();
    }
  }, [time, isTimerActive]);

  function handleTimeout() {
    setOuts(prev => prev + 1);
    setFeedback("Time's up! Strike!");
    SOUND_EFFECTS.out.play();
    setIsTimerActive(false);
    
    if (outs + 1 >= 3) {
      setGameState('over');
    }
  }

  saveDailyState({
    gameState,
    year,
    outs,
    strikes,
    score,
    achievements,
    perfectStreak,
    sequenceIndex
  });

  function handleYearChange(e) {
    const newYear = Math.max(1850, Math.min(2025, parseInt(e.target.value)));
    setYear(newYear);
    playSound('sliderTick');
    if (!guessStartTime) {
      setGuessStartTime(Date.now());
      setIsTimerActive(true);
    }
  }

  function checkAchievements(isExactMatch, timeTaken) {
    const newAchievements = [...achievements];
    
    if (isExactMatch) {
      if (!achievements.includes('FIRST_HIT')) {
        newAchievements.push('FIRST_HIT');
      }
      
      const newStreak = perfectStreak + 1;
      setPerfectStreak(newStreak);
      
      if (newStreak >= 3 && !achievements.includes('STREAK_3')) {
        newAchievements.push('STREAK_3');
      }
      
      if (timeTaken < 10 && !achievements.includes('SPEED_DEMON')) {
        newAchievements.push('SPEED_DEMON');
      }
      
      if (score >= 1000 && !achievements.includes('POWER_HITTER')) {
        newAchievements.push('POWER_HITTER');
      }
      
      if (outs === 0 && !achievements.includes('NO_STRIKES')) {
        newAchievements.push('NO_STRIKES');
      }
    } else {
      setPerfectStreak(0);
    }
    
    if (newAchievements.length !== achievements.length) {
      setAchievements(newAchievements);
    }
  }

  function playSound(soundName) {
    if (!isMuted && SOUND_EFFECTS[soundName]) {
      console.log(`Attempting to play sound: ${soundName}`);
      SOUND_EFFECTS[soundName].play()
        .then(() => {
          console.log(`Successfully played ${soundName}`);
        })
        .catch(err => {
          console.error(`Failed to play ${soundName}:`, err);
        });
    }
  }

  function handleGuess() {
    const targetYear = currentMoment.year;
    const difference = Math.abs(targetYear - year);
    let timeTaken = null;
    let feedbackResult = '';
    let points = 0;
  
    if (!guessStartTime) {
      setGuessStartTime(Date.now());
    } else {
      timeTaken = (Date.now() - guessStartTime) / 1000;
    }
  
    const timeBonus = timeTaken < 10 ? 100 : 0;
  
    // Perfect guess = HOME RUN
    if (difference === 0) {
      playSound('homeRun');
      points = 400 + timeBonus;
      setScore((prevScore) => prevScore + points);
      feedbackResult = "HOME RUN!";
      checkAchievements(true, timeTaken);
      
      // Only add to collection on perfect guesses
      if (!collectedMoments.includes(currentMoment.id)) {
        setCollectedMoments(prev => [...prev, currentMoment.id]);
      }

      setFeedbackData({
        result: feedbackResult,
        yearDifference: difference,
        points: points,
        image: currentMoment.image,
        funFact: currentMoment.funFact,
        isGameOver: sequenceIndex >= 2,
        isFoulBall: false,
        currentYear: currentMoment.year
      });
      setShowFeedback(true);
      return;
    }
  
    // Way off guess (10+ years) = immediate out
    if (difference >= 10) {
      playSound('out');
      const newOuts = outs + 1;
      setOuts(newOuts);
      setStrikes(0); // Reset strikes on out
      
      feedbackResult = "OUT!";
      
      setFeedbackData({
        result: feedbackResult,
        yearDifference: difference,
        points: 0,
        image: currentMoment.image,
        funFact: currentMoment.funFact,
        isGameOver: newOuts >= 3,
        isFoulBall: false,
        currentYear: currentMoment.year
      });
      setShowFeedback(true);
      return;
    }
  
    // Handle foul balls (within 10 years)
    const newStrikes = strikes + 1;
    
    // First or second strike - show foul ball overlay
    if (newStrikes < 3) {
      setStrikes(newStrikes);
      playSound('hit');
      setFeedbackData({
        yearDifference: difference,
        strikes: newStrikes,
        isFoulBall: true,
        currentYear: currentMoment.year
      });
      setShowFeedback(true);
      return;
    }
    
    // On third strike, determine if they get points
    setStrikes(0); // Reset strikes
    playSound('hit');
    
    if (difference <= 5) {
      if (difference <= 1) {
        points = 300 + timeBonus;
        feedbackResult = "TRIPLE!";
      } else if (difference <= 3) {
        points = 200 + timeBonus;
        feedbackResult = "DOUBLE!";
      } else {
        points = 100 + timeBonus;
        feedbackResult = "SINGLE!";
      }
      setScore((prevScore) => prevScore + points);
    } else {
      feedbackResult = "STRIKE THREE! YOU'RE OUT!";
      const newOuts = outs + 1;
      setOuts(newOuts);
    }
    
    setFeedbackData({
      result: feedbackResult,
      yearDifference: difference,
      points: points,
      image: currentMoment.image,
      funFact: currentMoment.funFact,
      isGameOver: (outs + 1 >= 3) || (sequenceIndex >= 2),
      isFoulBall: false,
      currentYear: currentMoment.year
    });
    setShowFeedback(true);
    
    checkAchievements(false, timeTaken);
    setGuessStartTime(null);
    setIsTimerActive(false);
    setPreviousDifference(difference);
  }

  function handleFeedbackNext() {
    setShowFeedback(false);
    
    // If it's a foul ball on the last image, just continue
    if (feedbackData.isFoulBall && sequenceIndex >= 2) {
      return;
    }
    
    // If we have 3 outs, go to game over
    if (outs >= 3) {
      setGameState('over');
      return;
    }
    
    // If we're on the last image and it wasn't a foul ball, go to game over
    if (sequenceIndex >= 2 && !feedbackData.isFoulBall) {
      setGameState('over');
      return;
    }
    
    // Only advance to next image if it wasn't a foul ball
    if (!feedbackData.isFoulBall) {
      const nextIndex = sequenceIndex + 1;
      setImageOpacity(0);
      setTimeout(() => {
        setSequenceIndex(nextIndex);
        setCurrentMoment(getDailyMoment(nextIndex));
        setYear(1950);
        setTime(30);
        setIsTimerActive(false);
        setGuessStartTime(null);
        setStrikes(0); // Reset strikes for new image
        setTimeout(() => {
          setImageOpacity(1);
        }, 300);
      }, 300);
    }
  }

  function handleRestart() {
    setYear(1950);
    setOuts(0);
    setStrikes(0);
    setScore(0);
    setFeedback('');
    setPerfectStreak(0);
    setAchievements([]);
    setGameState('playing');
    setTime(30);
    setIsTimerActive(false);
    setGuessStartTime(null);
    setSequenceIndex(0);
    setCurrentMoment(getDailyMoment(0));
    setShowFeedback(false);
    setFeedbackData(null);
    setImageOpacity(1);
  }

  function handleStagingReset() {
    // Clear all localStorage data
    localStorage.removeItem(getTodayKey());
    localStorage.removeItem('baseball-collection');
    localStorage.removeItem('baseball-muted');
    
    // Reset all state
    setYear(1950);
    setOuts(0);
    setStrikes(0);
    setScore(0);
    setFeedback('');
    setPerfectStreak(0);
    setAchievements([]);
    setGameState('playing');
    setTime(30);
    setIsTimerActive(false);
    setGuessStartTime(null);
    setSequenceIndex(0);
    setCurrentMoment(getDailyMoment(0));
    setCollectedMoments([]);
  }

  useEffect(() => {
    localStorage.setItem('baseball-muted', JSON.stringify(isMuted));
  }, [isMuted]);

  useEffect(() => {
    // Preload sounds
    Object.values(SOUND_EFFECTS).forEach(sound => {
      sound.load();
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('baseball-collection', JSON.stringify(collectedMoments));
  }, [collectedMoments]);

if (gameState === 'over') {
    return (
      <div 
        className="min-h-screen w-full" 
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.95) 70%), url('/bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'black'
        }}>
        <GameOver 
          score={score}
          achievements={achievements}
          onRestart={handleRestart}
          currentMoment={currentMoment}
          onShowCollection={() => setShowCollection(true)}
          onShowBooks={() => setShowBooks(true)}
          collectedMoments={collectedMoments}
          setAchievements={setAchievements}
        />
        {showCollection && (
          <Collection 
            onClose={() => setShowCollection(false)} 
            collectedMoments={collectedMoments}
          />
        )}
        {showBooks && (
          <Books 
            onClose={() => setShowBooks(false)}
          />
        )}
      </div>
    );
  }

  const yearDigits = year.toString().padStart(4, '0').split('');

  return (
    <div 
      className="min-h-screen w-full" 
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.95) 70%), url('/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'black'
      }}>

      <div className="max-w-4xl mx-auto p-1 sm:p-4">
        <div className="text-center relative mb-1 pt-3 sm:pt-0">
          <img  
            src="/LOGO.png"
            className="w-full max-w-[472px] sm:max-w-[420px] md:max-w-[525px] mx-auto px-1 sm:px-2 md:px-0"
            alt="The Daily Baseball Photo Trivia Game" 
          />
        </div>
        
        <Card className="bg-transparent border-none">
          <CardContent className="p-1 sm:p-2">
            {/* Photo container */}
            <div className="relative mx-0 sm:mx-2 mb-4 sm:mb-8">
              <div 
                className="relative"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {/* Single background layer */}
                <div 
                  className="absolute hidden sm:block"
                  style={{
                    backgroundImage: 'url(/bgfade%20Medium.png)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%',
                    top: '10px',
                    left: '-20px',
                    zIndex: -1,
                    transform: 'rotate(-3deg)',
                    opacity: 0.8
                  }}
                />
                
                {/* Main image container */}
                <div 
                  className="relative bg-[#f5f2e6] p-2 sm:p-4 w-full sm:w-auto"
                  style={{
                    zIndex: 2,
                    boxShadow: '10px 6px 12px rgba(0, 0, 0, 0.9)',
                    maxWidth: '100%',
                    margin: '0'
                  }}
                >
                  <div
                    className="transition-opacity duration-300 ease-in-out relative"
                    style={{ opacity: imageOpacity }}
                  >
                    <img
                      src={currentMoment.image}
                      alt={currentMoment.description}
                      className="w-full h-auto object-contain max-h-[600px] sm:max-h-[500px]"
                      style={{
                        objectFit: 'contain',
                        width: '100%',
                        height: 'auto'
                      }}
                    />
                    <button
                      onClick={() => setShowZoom(true)}
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors duration-200"
                      title="Zoom Image"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="white" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        <line x1="11" y1="8" x2="11" y2="14"/>
                        <line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats and How To Play row with Year */}
            <div className="hidden md:flex justify-between items-start -mb-8">
              <button
                onClick={() => setShowHowToPlay(true)}
                className="text-[#f5f2e6]/70 hover:text-[#f5f2e6] text-[0.9375rem] transition-colors duration-200"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                HOW TO PLAY
              </button>
              <div 
                className="text-[#f5f2e6]/70 text-[0.9375rem] space-y-1 text-right"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                <div><span className="text-[#f5f2e6]/45">Image:</span> {sequenceIndex + 1} of 3</div>
                <div><span className="text-[#f5f2e6]/45">Strikes:</span> {strikes}</div>
                {outs > 0 && <div><span className="text-[#f5f2e6]/45">Outs:</span> {outs}</div>}
              </div>
            </div>

            {/* Mobile Stats Display */}
            <div className="flex justify-between items-center mb-4 md:hidden px-2">
              <div 
                className="text-[#f5f2e6]/70 text-base"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                <span className="text-[#f5f2e6]/45">Image:</span> {sequenceIndex + 1}/3
              </div>
              <div 
                className="text-[#f5f2e6]/70 text-base"
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                <span className="text-[#f5f2e6]/45">Strikes:</span> {strikes}
              </div>
              {outs > 0 && (
                <div 
                  className="text-[#f5f2e6]/70 text-base"
                  style={{ fontFamily: 'Douglas-Burlington-Regular' }}
                >
                  <span className="text-[#f5f2e6]/45">Outs:</span> {outs}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="relative">
                <div className="flex justify-center">
                  {yearDigits.map((digit, index) => (
                    <YearDigit key={index} digit={digit} />
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <input
                  type="range"
                  min="1850"
                  max="2025"
                  value={year}
                  onChange={handleYearChange}
                  className="w-full h-3 bg-gray-600 rounded-lg appearance-none cursor-pointer mt-4 mb-2"
                />
                <div className="flex justify-between text-sm text-gray-400 px-2">
                  <span>1850</span>
                  <span>2025</span>
                </div>
              </div>
              
              <button
                onClick={handleGuess}
                disabled={showFeedback || imageOpacity < 1}
                className={`w-full mb-8 bg-[#1e4fba] hover:bg-[#2460e6] text-white py-4 rounded-lg text-2xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:bg-[#1a3f8c] ${(showFeedback || imageOpacity < 1) ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ fontFamily: 'Douglas-Burlington-Regular' }}
              >
                TAKE A SWING
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
      {showCollection && (
        <Collection 
          onClose={() => setShowCollection(false)} 
          collectedMoments={collectedMoments}
        />
      )}
      {showHowToPlay && (
        <HowToPlay onClose={() => setShowHowToPlay(false)} />
      )}
      
      {showFeedback && feedbackData && (
        <FeedbackOverlay
          {...feedbackData}
          onNext={handleFeedbackNext}
        />
      )}
      {showZoom && (
        <ImageZoom
          image={currentMoment.image}
          description={currentMoment.description}
          onClose={() => setShowZoom(false)}
        />
      )}
      {window.location.hostname === 'localhost' && (
        <div className="fixed bottom-2 right-2">
          <button
            onClick={handleStagingReset}
            className="bg-gray-600/30 hover:bg-gray-600/50 text-white/50 hover:text-white/80 px-3 py-1 rounded text-xs transition-all duration-200"
          >
            Reset For Testing
          </button>
        </div>
      )}
    </div>
  );
}

<?php
$milestones = json_decode(file_get_contents('https://api.github.com/repos/TAMA-Studios/websiteresources/milestones'), true);
echo "<h1>Project Roadmap</h1>";
if ($milestones) {
    foreach ($milestones as $milestone) {
        echo "<div>";
        echo "<h2>" . $milestone['title'] . "</h2>";
        echo "<p>" . $milestone['description'] . "</p>";
        echo "<p>Due on: " . $milestone['due_on'] . "</p>";
        echo "</div>";
    }
} else {
    echo "<p>Unable to fetch roadmap data.</p>";
}
?>

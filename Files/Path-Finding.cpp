#include <iostream>
#include <set>
#include <map>
using namespace std;

int FindPath(const int nStartX, const int nStartY,
	const int nTargetX, const int nTargetY,
	const unsigned char* pMap, const int nMapWidth, const int nMapHeight,
	int* pOutBuffer, const int nOutBufferSize) {

	int mapLength = nMapHeight*nMapWidth;
	int start = nStartX + nStartY*nMapWidth;
	int goal = nTargetX + nTargetY*nMapWidth;

	set<int> unEvaluated = { start };
	set<int> isEvaluated;
	set<int> locations;

	//the location which each viable location came from, with shortest path from start in mind
	map<int, int> pathFrom;	
	//the shortest path from start to a each viable location
	map<int, int> distanceStart; 
	//the theoretical shortest distance to goal for each viable location
	map<int, int> distanceGoal; 

	unsigned char a = 1;
	for (int i = 0; i < mapLength; i++) {//initiate a map with all avaiable locations
		if (pMap[i] == a) {
			locations.insert(i);
		}
	}

	distanceStart[start] = 0;	
	distanceGoal[start] = abs(nStartX - nTargetX) + abs(nStartY - nTargetY);

	while (!unEvaluated.empty()) {//while there is still locations to evaluate
		int current=-1;

		//find and select the location with the theoretical shortest distance to goal for evaluation
		for (set<int, int>::iterator i = unEvaluated.begin(); i != unEvaluated.end(); i++) {
			if (current == -1||distanceGoal.find(*i)->second < 
			(abs(current%nMapWidth - nTargetX) + abs(current / nMapWidth - nTargetY))) {
				current = *i;
			}
		}

		if (current == goal) {
			int path = 0;

			//when goal is found calculate the path length from start to goal
			while (pathFrom.find(current) != pathFrom.end()) {
				current = pathFrom[current];
				path++;
			}

	//if the pathlength is within limitations, set up pOutBuffer with the path and return pathlength
			if (path <= nOutBufferSize) {
				current = goal;
				int i = path-1;
				pOutBuffer[i] = goal;
				while (i > 0) {
					pOutBuffer[i-1] = pathFrom[current];
					current = pathFrom[current];
					i--;
				}
				return path;
			}
			return -1;
			
		}
		unEvaluated.erase(current);
		isEvaluated.insert(current);		

		//for each possible adjacent location of the evaluated location, check if it is inside the map
		for (int i = 0; i < 4; i++) {
			bool passed = false;
			int adjacent;

			switch (i) {
			case 0:
				if (current%nMapWidth != 0) {
					adjacent = current - 1;
					passed = true;
				}
				break;
			case 1:
				if (current%nMapWidth != nMapWidth - 1) {
					adjacent = current + 1;
					passed = true;
				}
				break;
			case 2:
				if (current / nMapWidth != 0) {
					adjacent = current - nMapWidth;
					passed = true;
				}
				break;
			case 3:
				if (current / nMapWidth != nMapHeight - 1) {
					adjacent = current + nMapWidth;
					passed = true;
				}
				break;
			}

			//see if the adjacent location also is a viable location, and not already evaluated
			if (passed && locations.find(adjacent) != locations.end() 
				&& isEvaluated.find(adjacent) == isEvaluated.end()) {		
				int startdistance = 1 + distanceStart[current];
				bool isnew = false;

				//if the adjacent location is a newly found location, put it in the unEvaluated set
				if (unEvaluated.find(adjacent) == unEvaluated.end()) {		
					unEvaluated.insert(adjacent);
					isnew = true;
				}

				//if new, or had shorter distance from start, update it in all maps
				if (isnew || startdistance < distanceStart[adjacent]) {		
					pathFrom[adjacent] = current;
					distanceStart[adjacent] = startdistance;
					distanceGoal[adjacent] = startdistance + 
					abs(adjacent%nMapWidth - nTargetX) + abs(adjacent / nMapWidth - nTargetY);
				}
			}
		}
	}
	return -1;	//if no path was found and no more locations are available for evaluation
}

int main(int argc, char** argv) {
	unsigned char pMap[] = { 0,0,1,0,1,1,1,0,1 };
	int pOutBuffer[7];
	int var = FindPath(2, 0, 0, 2, pMap, 3, 3, pOutBuffer, 7);
	cout << "shortest path:" << var << endl;

	if (var > -1) {
		cout << "pOutBuffer:" << endl;
		for (int i = 0; i < var; i++) {
			cout << pOutBuffer[i];
			if (i != (var - 1)) {
				cout << ", ";
			}
		}
		cout << endl;
	}
	cout << endl;
	
	unsigned char pMap2[] = { 1,1,1,1,0,1,0,1,0,1,1,1 };
	int pOutBuffer2[12];
	int var2 = FindPath(0, 0, 1, 2, pMap2, 4, 3, pOutBuffer2, 12);
	cout << "shortest path:" << var2 << endl;

	if (var2 > -1) {
		cout << "pOutBuffer:" << endl;
		for (int i = 0; i < var2; i++) {
			cout << pOutBuffer2[i];
			if (i != (var2 - 1)) {
				cout << ", ";
			}
		}
		cout << endl;
	}
	cout << endl;

	return 0;
}